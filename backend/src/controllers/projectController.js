import Project from "../models/Project.js";
import User from "../models/User.js";

//create project
export const createProject = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required",
            });
        }

        const project = await Project.create({
            name,
            description,
            status,
            createdBy: req.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
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

//get all project
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            projects,
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

//get single project
export const getProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id).populate("createdBy", "name email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            project,
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

//update project
export const updateProject = async (req, res) => {
    try {
        // const { id } = req.params;

        const { name, description, status } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                status,
            }, {
            new: true,
            runValidators: true,
        }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
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

//delete project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",

            });
        }

        return res.status(200).json({
            success: true,
            message: "Project delete successfully",
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

//add member to project
export const addMember = async (req, res) => {
    try {
        const { userId } = req.body;

        // if(!userId){
        //       return res.status(404).json({
        //         success: false,
        //         message: "User ID not found",
        //     });
        // }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (project.members.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User is already a project member",
            });
        }

        project.members.push(userId);

        await project.save();

        return res.status(200).json({
            success: true,
            message: "Member added successfully",
            project,
        });


    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

//get project member 
export const getProjectMembers = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("members", "name email");
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            members: project.members,
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

//remove member
export const removeMember = async (req, res) => {
    try {

        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const memberExists = project.members.some((member) => member.toString() === userId);

        if (!memberExists) {
            return res.status(404).json({
                success: false,
                message: "User is not a project member",
            });

        }
        project.members = project.members.filter(
            (member) => member.toString() !== userId
        );

        await project.save();

        return res.status(200).json({
            success: true,
            message: "Member removed successfully",
            project,
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