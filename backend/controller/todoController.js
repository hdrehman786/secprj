import { Todo } from "../modals/todoModel.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            data: todos.length === 0 ? [] : todos
        });
    } catch (e) {
        console.log(e);
    }
}

export const addTodo = async (req, res, next) => {
    try {
        const { title} = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Please provide both title and description.' });
        }
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
        newTodo.save();
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

export const todoCompleted = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found", success: false });
        }

        // Toggle the completed state
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();

        res.status(200).json({ message: "Todo completion status toggled", success: true, todo: updatedTodo });
    } catch (e) {
        console.error("Error toggling todo completion status:", e);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            req.body, // Update fields from request body
            { new: true, runValidators: true } // Ensure the updated document is returned
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found", success: false });
        }

        res.status(200).json({ message: "Todo updated successfully", success: true, todo: updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error, success: false });
    }
};
