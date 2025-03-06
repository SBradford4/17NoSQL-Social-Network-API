import { Schema, Types, model, type Document } from 'mongoose';



interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: String,
    reactions: Schema.Types.ObjectId[]
}


interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: String,
    username: String,
    createdAt: Date
}


const reactionSchema = new Schema<IReaction>({
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
        get: function(value: any) {
            return value.toLocaleDateString("en-us")
        }
    },
})

const thoughtSchema = new Schema<IThought>({
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
        get: function(value: any) {
            return value.toLocaleDateString("en-us")
        }
    },
    reactions: [reactionSchema]
    
},
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

export default Thought;
