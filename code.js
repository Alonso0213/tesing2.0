const express = require("express");
const app = express();
require("./config/route");
require("./models/connectDB");
const excel = require("exceljs");
const bodyParser = require("body-parser");
const User = require("./models/connectDB");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("./static"));
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, personalityType1, personalityType2, personalityType3, personalityType4, enneagram, mainUserPersona, secondaryUserPersona} = req.body;

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      personalityType1: personalityType1,
      personalityType2: personalityType2,
      personalityType3: personalityType3,
      personalityType4: personalityType4,
      enneagram: enneagram,
      mainUserPersona: mainUserPersona,
      secondaryUserPersona: secondaryUserPersona
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/download-excel", async (req, res) => {
  try {
    const users = await User.find();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.addRow(["First Name", "Last Name", "Personality Type 1", "Personality Type 2", "Personality Type 3", "Personality Type 4", "Enneagram", "Main User Persona", "Secondary User Persona"]);

    users.forEach((user) => {
      worksheet.addRow([user.firstName, user.lastName, user.personalityType1, user.personalityType2, user.personalityType3, user.personalityType4, user.enneagram, user.mainUserPersona, user.secondaryUserPersona]);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="userdata.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
