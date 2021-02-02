import studentAssigmentsSvc from '../../services/student-assignments-svc';

export default async function userHandler(req, res) {
  if (req.method !== 'GET') return res.status(404).end('Not found');

  const { studentId } = req.query;
  res.status(200).json(await studentAssigmentsSvc.findAll(studentId));
}