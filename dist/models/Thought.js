import { Schema, Types, model } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (value) {
            return value.toLocaleDateString("en-us");
        }
    },
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (value) {
            return value.toLocaleDateString("en-us");
        }
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
