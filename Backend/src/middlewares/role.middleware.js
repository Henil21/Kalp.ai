export const researcherOnly = (req, res, next) => {
  if (req.user.role !== "RESEARCHER") {
    return res.status(403).json({
      message: "Only researchers can perform this action",
    });
  }
  next();
};
