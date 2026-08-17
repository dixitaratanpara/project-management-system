import Task from "../models/Task";
import User from "../models/User";
import Project from "../models/Project";

//create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, project, assignedTo } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: "Title and project are required",
      });
    }

    //check project
    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (assignedTo) {
      const userExists = await User.findById(assignedTo);

      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found",
        });
      }
    }

    const isMember = projectExists.members.some(
      (member) => member.toString() === assignedTo
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not a project member",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      project,
      assignedTo: assignedTo || null,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo } = req.body;

       const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    if (assignedTo) {
      const userExists = await User.findById(assignedTo);

      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found",
        });
      }

      const project = await Project.findById(task.project);

      const isMember = project.members.some(
        (member) => member.toString() === assignedTo
      );

      if (!isMember) {
        return res.status(400).json({
          success: false,
          message: "Assigned user is not a project member",
        });
      }

    // const task = await Task.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     title,
    //     description,
    //     status,
    //     priority,
    //     assignedTo: assignedTo || null,
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // )
    //   .populate("project", "name")
    //   .populate("assignedTo", "name email")
    //   .populate("createdBy", "name email");

    // if (!task) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Task not found",
    //   });
    // }
    
  //Update task
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;

    if (assignedTo !== undefined) {
      task.assignedTo = assignedTo || null;
    }

    await task.save();

    // Get populated task
    await task.populate("project", "name");
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");

 
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};