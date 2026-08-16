import Project from "../models/Project";

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
        const project = await Project.find()
            .populate("CreatedBy", "name email")
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