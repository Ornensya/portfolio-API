const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();
const { body, validationResult } = require('express-validator');

router.post(
  "/tambahData",
  body("name").notEmpty().isString(),
  body("position").notEmpty().isString(),
  body("aboutMe").notEmpty().isString(),
  body("works").notEmpty().isArray(),
  body("works.*.place").isString(),
  body("works.*.position").isString(),
  body("works.*.startAt").isString(),
  body("works.*.endAt").isString(),
  body("works.*.description").isString(),
  body("education").notEmpty().isArray(),
  body("education.*.institutionName").isString(),
  body("education.*.studyProgram").isString(),
  body("education.*.startAt").isString(),
  body("education.*.endAt").isString(),
  body("education.*.gpa").isFloat(),
  body("projects").notEmpty().isArray(),
  body("projects.*.projectName").isString(),
  body("projects.*.startAt").isString(),
  body("projects.*.description").isString(),
  body("contact").notEmpty().isArray(),
  body("contact.*.platform").isString(),
  body("contact.*.username").isString(),
  body("contact.*.url").isString(),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array()});
      }
      const {
        name, 
        position,
        aboutMe,
        works,
        education,
        projects,
        contact
      } = req.body;
  
      const createUser = await prisma.users.create({
        data: {
          name,
          position,
          aboutMe,
          works:works,
          education: education,
          projects: projects,
          contact: contact
        },
      });
      res.status(200).json({message: "Add Data Succes", createUser});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal menambahkan data" });
    }
  }
);

router.get("/ambilData", async (req, res) => {
  try {
    const identitas = await prisma.users.findMany();

    if (identitas.length === 0) {
      res.status(404).json({ message: "Data diri masih kosong" });
    } else {
      res.json(identitas);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Gagal mengambil data diri" });
  }
});


module.exports = router;
