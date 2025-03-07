// ObjectId() method for converting studentId string into an ObjectId for querying database
// import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// TODO: Create an aggregate function to get the number of students overall

// export const headCount = async () => {
//     // Your code here
//     const numberOfStudents = await Student.aggregate()
//     return numberOfStudents;
// }

// Aggregate function for getting the overall grade using $avg
// export const grade = async (studentId: string) =>
//     Student.aggregate([
//         // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
//     {
//         // Your code here
//       },
//       {
//         $unwind: '$assignments',
//       },
//       // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
//       {
//         // Your code here
//       },
//     ]);

/**
 * GET All Students /students
 * @returns an array of Students
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// /**
//  * GET User based on id /users/:id
//  * @param string id
//  * @returns a single User object
// */
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
        .populate("thoughts")
        .populate("friends");
        if (user) {
            res.json({
                user
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// /**
//  * POST User /users
//  * @param object user
//  * @returns a single User object
// */

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
// /**
//  * DELETE User based on id /users/:id
//  * @param string id
//  * @returns string 
// */

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// /**
//  * POST Friend based on /users/:userId/friends/:friendId
//  * @param string id
//  * @param object assignment
//  * @returns object student 
// */

export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!friend) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(friend);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// /**
//  * DELETE Friend based on /users/:userId/friends/:friendId
//  * @param string assignmentId
//  * @param string studentId
//  * @returns object student 
// */

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!friend) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(friend);
    } catch (err) {
        return res.status(500).json(err);
    }
}
