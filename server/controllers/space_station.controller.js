import spaceStationModel from "../models/space_station.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/OTP_Gen.js";
import transporter from "../utils/mailer.config.js";

// Register or Add Space Station
export const register = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;
    const requiredFields = { name, mobile, email, password, confirmPassword };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        });
      }
    }

    if (password !== confirmPassword) {
      return res.status(300).json({
        success: false,
        message: "Passwords and Confirm Password Doesn't Match",
      });
    }

    const isExists = await spaceStationModel.findOne({ email: email });
    if (isExists) {
      return res.status(103).json({
        success: false,
        message: "Space Station Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await spaceStationModel.create({
      name: name,
      email: email,
      mobile: mobile,
      password: hashedPassword,
    });

    const spaceStation = await spaceStationModel.findOne({ email: email });

    return res.status(200).json({
      success: true,
      message: "Space Station created Successfully",
      email: email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login Space Station
export const login = async (req, res) => {
  try {
    const { email, password, os, deviceName, ip, location } = req.body;

    // Validate input
    if (!email || !password || !ip) {
      return res.status(400).json({
        success: false,
        message: "Email, Password, and IP address are required",
      });
    }

    // Find user by email
    let spaceStation = await spaceStationModel.findOne({ email });
    if (!spaceStation) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, spaceStation.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Create new login entry with current date and time
    const newLogin = {
      ip: String(ip), // Ensure ip is a string
      time: new Date(), // Set to current date and time
    };

    // Push new login to last_login array
    spaceStation.last_login.push(newLogin);

    // Check if the device already exists in device_details
    const deviceExists = spaceStation.device_details.some(
      (device) => device.device_ipAddress === newLogin.ip
    );

    if (!deviceExists) {
      // Add new device details
      const newDeviceDetails = {
        device_os: os,
        device_name: deviceName,
        device_ipAddress: newLogin.ip,
        device_location: location,
      };
      spaceStation.device_details.push(newDeviceDetails);

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "New Device Login Detected - Space Station Account",
        text: `Hello,

            We noticed a login to your Space Station account from a new device. If this was you, there's nothing to worry about. Here are the details:

            - Device: ${deviceName || "Unknown"}
            - Location: ${location || "Unknown"}
            - Time: ${newLogin.time.toLocaleString() || "Unknown"}

            If you did not initiate this login, please reset your password immediately and contact our support team for assistance.

            Safe travels,
            The Space Station Team at Intergalactic Ecom`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>New Device Login Detected</h2>
                <p>Hello,</p>
                <p>We noticed a login to your Space Station account from a new device. If this was you, there's no need for concern. Below are the login details:</p>
                <ul>
                    <li><strong>Device</strong>: ${deviceName || "Unknown"}</li>
                    <li><strong>Location</strong>: ${location || "Unknown"}</li>
                    <li><strong>Time</strong>: ${newLogin.time.toLocaleString() || "Unknown"}</li>
                </ul>
                <p>If you did not initiate this login, we recommend resetting your password immediately and reaching out to our support team.</p>
                <br />
                <p>Safe travels,</p>
                <p><strong>The Space Station Team</strong></p>
                <p><em>at Intergalactic Ecom</em></p>
            </div>`,
      };

      // Send email
      await transporter.sendMail(mailOptions);
    }

    // Save updated spaceStation document
    await spaceStation.save();

    const tokenData = {
      userId: spaceStation._id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    const newSpaceStation = await spaceStationModel.findOne({ email });

    // User info to send in response
    const user = {
      _id: newSpaceStation._id,
      name: newSpaceStation.name,
      email: newSpaceStation.email,
      mobile: newSpaceStation.mobile,
      address: newSpaceStation.address,
      device_details: newSpaceStation.device_details,
      image: newSpaceStation.image,
      last_login: newSpaceStation.last_login,
    };

    // Send response with token in cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Space Station Login Successfully",
        user,
        token,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logout Successfully",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Space Station
export const getAllSpaceStation = async (req, res) => {
  try {
    const spaceStations = await spaceStationModel.find();
    if (!spaceStations || spaceStations.length < 0) {
      return res.status(404).json({
        success: false,
        message: "No Space Stations Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: spaceStations,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Space Station By Id
export const getSpaceStationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: spaceStation,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Space Station
export const updateSpaceStation = async (req, res) => {
  // Correct way to access id from req
  const id = req.id;
  console.log(id);

  // Destructure the fields from request body
  const { name, email, mobile } = req.body;

  // File handling
  const image = req.file;

  // Check if ID is provided
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });
  }

  // Find the space station by ID
  const spaceStation = await spaceStationModel.findById(id);
  if (!spaceStation) {
    return res.status(404).json({
      success: false,
      message: "Space Station Not Found",
    });
  }

  // Updating fields with either new values or keeping existing ones
  const updatedData = {
    name: name || spaceStation.name,
    email: email || spaceStation.email,
    mobile: mobile || spaceStation.mobile,
    image: image ? image.path : spaceStation.image.path, // Check if image exists before accessing path
  };

  // Save the updated space station
  try {
    const updatedSpaceStation = await spaceStationModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Returns the updated document
    );

    const updatedSpaceStationData = await spaceStationModel.findById(id);

    const updateduserData = {
      _id: updatedSpaceStationData._id,
      name: updatedSpaceStationData.name,
      email: updatedSpaceStationData.email,
      mobile: updatedSpaceStationData.mobile,
      address: updatedSpaceStationData.address,
      device_details: updatedSpaceStationData.device_details,
      image: updatedSpaceStationData.image,
      last_login: updatedSpaceStationData.last_login,
    };

    // Return the updated space station
    return res.status(200).json({
      success: true,
      message: "Space Station Updated Successfully",
      user: updateduserData,
    });
  } catch (error) {
    // Handle any errors during the update process
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the space station",
      error: error.message,
    });
  }
};

// Delete Space Station
export const deleteSpaceStation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    await spaceStationModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Space Station Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const id = req.id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, spaceStation.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(300).json({
        success: false,
        message: "Passwords and Confirm Password Doesn't Match",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(300).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    spaceStation.password = hashedPassword;
    await spaceStation.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const spaceStationId = req.id;
    const {
      name,
      mobile,
      firstLine,
      secondLine,
      city,
      state,
      country,
      pincode,
    } = req.body;

    if (!spaceStationId) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    if (
      !name ||
      !mobile ||
      !firstLine ||
      !city ||
      !state ||
      !country ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const spaceStation = await spaceStationModel.findById(spaceStationId);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    spaceStation.address.push({
      name,
      mobile,
      firstLine,
      secondLine,
      city,
      state,
      country,
      pincode,
    });

    await spaceStation.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const spaceStation = await spaceStationModel.findOne({ email });
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    const token = jwt.sign(
      { userId: spaceStation._id },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "1d" }
    );

    const otp = generateOTP();

    spaceStation.otp = otp;
    spaceStation.otp_expiration_time = Date.now() + 10 * 60 * 1000;

    await spaceStation.save();

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP for reset password is ${otp}`,
      html: `<p>Your OTP for reset password is <strong>${otp}</strong></p>`,
    };

    // Send email with OTP
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .cookie("resetPasswordToken", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "OTP to reset the password has been sent to link",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPasswordOTPVerification = async (req, res) => {
  try {
    const id = req.id;
    const otp = Number(req.body.otp);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    if (spaceStation.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (spaceStation.otp_expiration_time < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    spaceStation.reset_password_status = true;

    spaceStation.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const id = req.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    const otp = generateOTP();

    console.log(`Your OTP for reset your password is: ${otp}`);

    spaceStation.otp = otp;
    spaceStation.otp_expiration_time = Date.now() + 10 * 60 * 1000;

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const id = req.id;
    const { newPassword, confirmPassword } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    if ((!newPassword, !confirmPassword)) {
      return res.status(400).json({
        success: false,
        message: "All field are necessary",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    const spaceStation = await spaceStationModel.findById(id);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    spaceStation.password = password;
    spaceStation.reset_password_status = false;

    await spaceStation.save();

    // Clear the authentication cookie
    res.clearCookie("authToken", {
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible via JavaScript
      sameSite: "Strict", // Helps prevent CSRF attacks
      secure: process.env.NODE_ENV === "production", // Send the cookie only over HTTPS in production
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteAddress = async (req, res) => {
  const spaceStationId = req.params.id;
  const addressIndex = req.body;

  try {
    const spaceStation = await spaceStationModel.findById(spaceStationId);
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    spaceStation.address.splice(addressIndex, 1);
    await spaceStation.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const accountOTPSend = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Validate if email exists
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Find the spaceStation by email
    const spaceStation = await spaceStationModel.findOne({ email: email });
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
        email,
      });
    }

    // Update OTP and expiration time (10 minutes)
    spaceStation.otp = otp;
    spaceStation.otp_expiration_time = new Date(Date.now() + 10 * 60000); // 10 minutes expiration

    // Save the updated spaceStation to the database
    await spaceStation.save();

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Activation OTP",
      text: `Your OTP for account activation is ${otp}`,
      html: `<p>Your OTP for account activation is <strong>${otp}</strong></p>`,
    };

    // Send email with OTP
    await transporter.sendMail(mailOptions);

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${email}`,
    });
  } catch (err) {
    console.error("Error sending OTP: ", err);

    // Catch any internal error and return server error response
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const accountVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate email and otp presence
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    // Find the spaceStation record by email
    const spaceStation = await spaceStationModel.findOne({ email: email });
    if (!spaceStation) {
      return res.status(404).json({
        success: false,
        message: "Space Station Not Found",
      });
    }

    // Check if OTP has expired
    if (spaceStation.otp_expiration_time < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Validate the provided OTP
    if (spaceStation.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Clear the OTP and expiration time
    spaceStation.otp = null;
    spaceStation.otp_expiration_time = null;
    spaceStation.account_verified = true;

    // Save the updated spaceStation to the database
    await spaceStation.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        "Welcome to Space Station - Your Intergalactic Account is Ready!",
      text: `Hello,
  
          Welcome to Space Station, part of the Intergalactic Ecom network! Your account has been successfully created.
          
          Get ready to explore a universe of unique interstellar products and services tailored just for you. Log in to your account to start your journey with Space Station. Our support team is here to assist you with any questions along the way.
          
          Safe travels,
          The Space Station Team at Intergalactic Ecom`,
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
              <h2>Welcome to Space Station!</h2>
              <p>We’re excited to have you onboard at Space Station, an exclusive part of Intergalactic Ecom.</p>
              <p>Your account has been successfully created. Prepare to explore a universe of unique interstellar products and services tailored for your needs.</p>
              <p>You can log in to your account and begin your journey with us. If you have any questions, our support team is here to assist you.</p>
              <br />
              <p>Safe travels,</p>
              <p><strong>The Space Station Team</strong></p>
              <p><em>at Intergalactic Ecom</em></p>
          </div>`,
    };

    // Send email with OTP
    await transporter.sendMail(mailOptions);
    // If OTP is valid and not expired
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
