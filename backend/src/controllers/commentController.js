import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

//create comment
export const createComment = async (req, res) => {
  try {

    const { text, task } = req.body;

    if (!text || !text) {
      return res.status(400).json({
        success: false,
        message: "Text and Task are required",
      });
    }

    const taskExist = await Task.findById(task);

    if (!taskExist) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const comment = await Comment.create({
      text,
      task,
      user: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });



  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//get comments this task
export const getTaskComments = async (req, res) => {
  try {

    const taskExists = await Task.findById(req.params.taskId);

    if (!taskExists) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const comments = await Comment.find({
      task: req.params.taskId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });

  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

}

//update comments
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    // const comment= await Comment.findByIdAndUpdate(
    //   req.params.id,
    //   { text },
    //   {
    //      new: true,
    //     runValidators: true,
    //   }).populate("user","name email");

    //   if (!comment) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Comment not found",
    //   });
    // }

    const comment = await Comment.findById(req.paramas.id);

     if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if(comment.user.toString() !== req.userId){
      return res.status(403).json({
        success:false,
        message:"You can only update your own comment",
      });
    }

    comment.text= text;

    await comment.save();

    await comment.populate("user","name email");

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//delete comments
export const deleteComment = async (req, res) => {
  try {
    // const comment = await Comment.findByIdAndDelete(req.params.id);

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    //check comment user role
    if(comment.user.toString()!==req.userId){
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comment",
      });
    }

    await Comment.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};