const ProgramModel = require('../models/Program');

module.exports.findAllPrograms = async () => {
    try {
        const programs = await ProgramModel.find();
        return programs;
    } catch (err) {
        throw new Error('Could not retrieve Programs');
    }
};
