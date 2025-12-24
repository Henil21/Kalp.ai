import Research from "../models/Research.js";

/* =========================
   GET all research (public)
========================= */
export const getAllResearch = async (req, res) => {
  const research = await Research.find()
    .populate("authorId", "name role")
    .sort({ createdAt: -1 });

  res.json(research);
};

/* =========================
   GET logged-in user's research
========================= */
export const getMyResearch = async (req, res) => {
  const research = await Research.find({
    authorId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(research);
};

/* =========================
   CREATE research (researcher only)
========================= */
export const createResearch = async (req, res) => {
  const { title, domain, abstract, links, sourceCode } = req.body;

  const research = await Research.create({
    title,
    domain,
    abstract,
    links,
    sourceCode,
    authorId: req.user.id,
  });

  res.status(201).json(research);
};

/* =========================
   UPDATE research (owner only)
========================= */
export const updateResearch = async (req, res) => {
  const research = await Research.findById(req.params.id);

  if (!research) {
    return res.status(404).json({ message: "Research not found" });
  }

  // ownership check
  if (research.authorId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { title, domain, abstract, links, sourceCode } = req.body;

  research.title = title ?? research.title;
  research.domain = domain ?? research.domain;
  research.abstract = abstract ?? research.abstract;
  research.links = links ?? research.links;
  research.sourceCode = sourceCode ?? research.sourceCode;

  await research.save();

  res.json(research);
};

/* =========================
   DELETE research (owner only)
========================= */
export const deleteResearch = async (req, res) => {
  const research = await Research.findById(req.params.id);

  if (!research) {
    return res.status(404).json({ message: "Research not found" });
  }

  // ownership check
  if (research.authorId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await research.deleteOne();

  res.json({ message: "Research deleted successfully" });
};
