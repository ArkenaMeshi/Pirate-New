const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const PirateSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "The email must be filled"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: { type: String, required: [true, "password kerkohet"] },
    // confirmPassword: { type: String,
    //   required:[true,"password kerkohet"] },
    lastname: { type: String, required: [true, "The name must be filled"] },

    name: { type: String, required: [true, "The name must be filled"] },
    image: { type: String, required: [true, "Image must be set "] },
    treasure: { type: Number, required: [true, "The treasure must be filled"] },
    phrase: { type: String, required: [true, "The phrase must be filled"] },
    position: {
      type: String,
      enum: [
        "captain",
        "first mate",
        "quarter master",
        "boatswain",
        "powder monkey",
      ],
      required: [true, "Position is riquired"],
    },
    pegleg: { type: Boolean },
    eyepatch: { type: Boolean },
    hookhand: { type: Boolean },
  },

  { timestamps: true }
);
// add this after UserSchema is defined
PirateSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

PirateSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});
PirateSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("Pirate", PirateSchema);
