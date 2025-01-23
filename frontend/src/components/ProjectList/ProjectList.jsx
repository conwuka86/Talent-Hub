import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [editingProjectId, setEditingProjectId] = useState(null);

    // Fetch projects from the API
    const fetchProjects = async () => {
        const response = await axios.get("/projects");
        setProjects(response.data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingProjectId) {
            // Update project
            await axios.put(`/projects/${editingProjectId}`, formData);
            setEditingProjectId(null);
        } else {
            // Add new project
            await axios.post("/projects", formData);
        }

        setFormData({ name: "", description: "" });
        fetchProjects();
    };

    // Handle editing a project
    const handleEdit = (project) => {
        setFormData({
            name: project.name,
            description: project.description,
        });
        setEditingProjectId(project._id);
    };

    // Handle deleting a project
    const handleDelete = async (id) => {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
    };

    return (
        <div>
            <h1>Project List</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingProjectId ? "Update Project" : "Add Project"}</button>
            </form>

            <div>
                {projects.map((project) => (
                    <div key={project._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <button onClick={() => handleEdit(project)}>Edit</button>
                        <button onClick={() => handleDelete(project._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
