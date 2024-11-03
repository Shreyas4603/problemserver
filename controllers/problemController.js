import asyncHandler from "express-async-handler";
import Problem from "../models/problemSchema.js";
import client from "../redisClient.js";

//Helper Functions
const fetchProblemIdsByToughnessLevel = async (level) => {
  // Define the cache key
  const cacheKey = `problems:toughness:${level}`;

  // Check the cache first
  const cachedProblemIds = await client.get(cacheKey);
  if (cachedProblemIds) {
    console.log("getting from cache".bgRed);
    return JSON.parse(cachedProblemIds);
  }

  // Query the database if not found in cache
  const problems = await Problem.find(
    { toughnessLevel: level },
    { problemId: 1 }
  );
  const problemIds = problems.map((problem) => problem.problemId);

  // Store the result in cache for future requests
  await client.set(cacheKey, JSON.stringify(problemIds));

  return problemIds;
};


const fetchProblemIds = async () => {
    // Define the cache key
    const cacheKey = "allProblemIds";
  
    // Check the cache first
    const cachedProblemIds = await client.get(cacheKey);    
    if (cachedProblemIds) {
      console.log("getting from cache".bgRed);
      return JSON.parse(cachedProblemIds);
    }
  
    // Query the database if not found in cache
    const problems = await Problem.find({}, { problemId: 1, _id: 0 }); // Fetch only the problemId field

    const problemIds = problems.map(problem => problem.problemId); // Extract IDs into an array
    console.log(problemIds)
    // Store the result in cache for future requests
    await client.set(cacheKey, JSON.stringify(problemIds));
  
    return problemIds;
  };



const getAllProblemIds = asyncHandler(async (req, res) => {
    const problemIds = await fetchProblemIds()

    // Return the fetched IDs
    res.status(200).json({
      data: problemIds,
      length: problemIds.length,
    });
  });
  

// Get all problems
const getAllProblems = asyncHandler(async (req, res) => {
  const cacheKey = "allProblems"; // Define a cache key for all problems

  // Try to get the data from Redis
  const cachedProblems = await client.get(cacheKey);

  if (cachedProblems) {
    // If cached data exists, parse and return it
    console.log("getting all from cache !".bgMagenta);
    return res.status(200).json({
      data: JSON.parse(cachedProblems),
      length: JSON.parse(cachedProblems).length,
    });
  }

  // If not found in cache, fetch from the database
  const problems = await Problem.find();

  // Cache the fetched data in Redis with an expiration time (e.g., 3600 seconds = 1 hour)
  await client.setEx(cacheKey, 3600, JSON.stringify(problems));

  // Return the fetched data
  res.status(200).json({
    data: problems,
    length: problems.length,
  });
});

// Get a problem by ID
const getProblemById = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ problemId: req.params.id });
  if (!problem) {
    return res.status(404).json({ error: "Problem not found 1" });
  }
  res.status(200).json(problem);
});

// Create a new problem
const createProblem = asyncHandler(async (req, res) => {
  const problem = new Problem({
    problemId: req.body.problemId,
    problemStatement: req.body.problemStatement,
    toughnessLevel: req.body.toughnessLevel,
    templateId: req.body.templateId,
    templateCodePy: req.body.templateCodePy,
    templateCodeJava: req.body.templateCodeJava,
    templateCodeCpp: req.body.templateCodeCpp,
    driverId: req.body.driverId,
    driverCodePy: req.body.driverCodePy,
    driverCodeJava: req.body.driverCodeJava,
    driverCodeCpp: req.body.driverCodeCpp,
  });

  const newProblem = await problem.save();

  // Invalidate the Redis cache for this toughness level
  await client.del(`problems:toughness:${problem.toughnessLevel}`);
  await client.del(`allProblems`);

  res.status(201).json({ message: "Problem created successfully" });
});

// Update a problem by ID
const updateProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ problemId: req.params.id });
  if (!problem) {
    return res.status(404).json({ error: "Problem not found 2" });
  }

  Object.assign(problem, req.body);
  const updatedProblem = await problem.save();

  // Invalidate the Redis cache for this toughness level
  await client.del(`problems:toughness:${updatedProblem.toughnessLevel}`);
  await client.del(`allProblems`);

  res.status(200).json({ message: "Problem updated successfully" });
});

// Delete a problem by ID
const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ problemId: req.params.id });
  if (!problem) {
    return res.status(404).json({ error: "Problem not found 3" });
  }

  await Problem.deleteOne({ problemId: req.params.id });

  // Invalidate the Redis cache for this toughness level
  await client.del(`problems:toughness:${problem.toughnessLevel}`);
  await client.del(`allProblems`);

  res.status(200).json({ message: "Problem deleted successfully" });
});

// Get problems by toughness level
const findProblemsByToughnessLevel = asyncHandler(async (req, res) => {
  const { level } = req.params; // Assuming the level is passed as a URL parameter
  const problems = await Problem.find({ toughnessLevel: level });

  if (problems.length === 0) {
    return res
      .status(404)
      .json({ error: "No problems found for this toughness level" });
  }

  res.status(200).json(problems);
});

// Get problem IDs by toughness level with Redis caching
const findProblemIdsByToughnessLevel = asyncHandler(async (req, res) => {
  const { level } = req.params;

  const problemIds = await fetchProblemIdsByToughnessLevel(level);

  if (problemIds.length === 0) {
    return res
      .status(404)
      .json({ error: "No problems found for this toughness level" });
  }

  res.status(200).json(problemIds);
});

const getUniqueProblem = asyncHandler(async (req, res) => {
  const { body } = req;
  console.log("body hit from java", body);
  return res.status(200).json("body hit from java" );
  // return res.status(200).json({ data: "body hit from java" });
});

export {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  findProblemsByToughnessLevel,
  findProblemIdsByToughnessLevel,
  getUniqueProblem,
  getAllProblemIds
};
