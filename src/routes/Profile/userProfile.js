
const User = require("../../DB/models/User")

const getUserProfile = async (req, res) => {
    const { custommerId } = req.params;

    try {
        const user = await User.findOne({ custommerId }).select("-isAdmin -__v -password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving user details.", error });
    }
}


const UpdateUserProfile = async (req, res) => {
    const { custommerId } = req.params;
    const updates = req.body; 

    try {
        const user = await User.findOneAndUpdate(
            { custommerId },
            { $set: updates },
            { new: true, fields: "-isAdmin -__v -password" }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User details updated successfully.", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating user details.", error });
    }
}


const VerifiPasword = async (req, res) => {
    const { custommerId } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password must be provided." });
    }

    try {

        const user = await User.findOne({ custommerId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }


        const isMatch = user.password === password;

        res.status(200).json({ matched: isMatch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while verifying the password.", error });
    }
}


module.exports = { VerifiPasword, UpdateUserProfile, getUserProfile }