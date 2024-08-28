const XLSX = require('xlsx');
const async = require('async');
const Candidate = require('../models/candidateModel');

const uploadCandidates = async(req,res) => {
    console.log(6);
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const xlData = XLSX.utils.sheet_to_json(sheet);
    console.log(10,xlData);

    try {
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const xlData = XLSX.utils.sheet_to_json(sheet);

        for (const row of xlData) {
            const existingCandidate = await Candidate.findOne({ email: row.Email }).exec();

            if (!existingCandidate) {
                const newCandidate = new Candidate({
                    name: row['Name of the Candidate'],
                    email: row.Email,
                    phoneNo: row['Mobile No.'],
                    dob: row['Date of Birth'],
                    experienceInMonths: (row['Work Experience']),
                    resumeTitle: row['Resume Title'],
                    location: row['Current Location'],
                    address: row['Postal Address'],
                    currentEmployer: row['Current Employer'],
                    currentDesignation: row['Current Designation']
                });

                await newCandidate.save();
            }
        }

        res.status(201).send('File processed successfully.');
    } catch (err) {
        res.status(500).send('Error processing file: ' + err.message);
    }
   
}

module.exports = {uploadCandidates};