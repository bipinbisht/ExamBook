const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Admin = require("../models/Admin");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { convertDate, reverseDate } = require("../utils");

const adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  const admin = await Admin.findOne({ name: userName });
  if (!admin) throw new BadRequestError("Invalid credentials");
  if (admin.password != password)
    throw new BadRequestError("Invalid credentials");
  res.status(StatusCodes.OK).json({ name: admin.name, role: admin.role });
};

const getAllStudent = async (req, res) => {
  let students = await Student.find({});
  if (!students) throw new NotFoundError("No students found...");
  let updatedStudents = students.map((student) => {
    if (student.createdAt) {
      let customDate = student.createdAt.toISOString().split("T")[0];
      let newDate = reverseDate(customDate);
      return {
        _id: student._id,
        createdAt: newDate,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        role: student.role,
        isActive: student.isActive,
      };
    }
  });
  students = updatedStudents;
  const result = students.filter((student) => student != null);
  res.status(StatusCodes.OK).json({ result, count: result.length });
};

const getAllTeacher = async (req, res) => {
  let teachers = await Teacher.find({});
  if (!teachers) throw new NotFoundError("No teachers found...");
  let updatedTeachers = teachers.map((teacher) => {
    if (teacher.createdAt) {
      let customDate = teacher.createdAt.toISOString().split("T")[0];
      let newDate = reverseDate(customDate);
      return {
        _id: teacher._id,
        createdAt: newDate,
        name: `${teacher.firstName} ${teacher.lastName}`,
        email: teacher.email,
        role: teacher.role,
        isActive: teacher.isActive,
      };
    }
  });
  teachers = updatedTeachers;
  const result = teachers.filter((teacher) => teacher != null);
  res.status(StatusCodes.OK).json({ result, count: result.length });
};

const changeStatus = async (req, res) => {
  const {
    body: { isActive },
    params: { id: teacherId },
  } = req;
  console.log(teacherId);
  if (isActive === " ")
    throw new BadRequestError("isActive field cannot be empty");
  const status = await Teacher.findByIdAndUpdate(
    { _id: teacherId },
    req.body,
    { new: true } //--> it will return updated value
  );
  if (!status) throw new NotFoundError(`No teacher found with id ${teacherId}`);
  res.status(StatusCodes.OK).json({ status });
};

const getStudentDetails = async (req, res) => {
  console.log(req.params);
  const studentId = req.params.id;
  if (studentId === " ")
    throw new BadRequestError(" studentId field cannot be empty");

  const data = await Student.find({ _id: studentId });
  if (!data) throw new NotFoundError(`No student found with id ${studentId}`);

  res.status(StatusCodes.OK).json(data);
};

const getTeacherDetails = async (req, res) => {
  console.log(req.params);
  const teacherId = req.params.id;
  if (teacherId === " ")
    throw new BadRequestError(" teacherId field cannot be empty");

  const data = await Teacher.find({ _id: teacherId });
  if (!data) throw new NotFoundError(`No student found with id ${teacherId}`);

  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  getAllStudent,
  getAllTeacher,
  adminLogin,
  changeStatus,
  getStudentDetails,
  getTeacherDetails,
};
