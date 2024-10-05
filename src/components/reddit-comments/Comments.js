import { useState } from "react";

// fetch database comments from here in initialComments
const initialComments = [
    {
        body: "This is comment 1",
        comments: [],
    },
    {
        body: "This is comment 2",
        Comments: [],
    },
    {
        body: "This is comment 3",
        comments: [],
    },
];

export default function Comments() {
    const [comments, setComments] = useState(initialComments);

    const onComment = (newComment) => {
        setComments((prev) => [
            { body: newComment.body, comments: newComment.comments },
            ...prev,
        ]);
    };

    return (
        <div className="flex flex-col">
            <h1 className="font-bold">I am a comment </h1>
            <CommentInput onComment={onComment} />
            <div className="flex flex-col gap-4">
                <CommentItems comments={comments} />
            </div>
        </div>
    );
}

const CommentInput = ({ onComment }) => {
    const [commentBody, setCommentBody] = useState("");

    return (
        <>
            <div className="flex flex-col">
                <input
                    value={commentBody}
                    onChange={(Event) => setCommentBody(Event.target.value)}
                    type="text"
                    className="border-[1px] border-zinc-400 p-4 w-3/4"
                    placeholder="whats on your mind.."
                />
                <button
                    onClick={() => {
                        onComment({ body: commentBody, comments: [] });
                        setCommentBody("");
                    }}
                    className="bg-whitesmoke-400 w-fit rounded-md p-2 border-[1px] border-zinc-400"
                >
                    comment
                </button>
            </div>
        </>
    );
};

const CommentItems = (props) => {
    const [isReply, setIsReply] = useState(false);
    const [comments, setComments] = useState([]);

    const onComment = (newComment) => {
        setComments((prev) => [
            { body: newComment.body, comments: newComment.comments },
            ...prev,
        ]);
    };

    const toggleReply = (commentIndex) => {

        setIsReply((prev) => ({
            ...prev,
            [commentIndex]: !prev[commentIndex],
        }));
    };
    return (
        <>
            {props.comments.map((comment, index) => (

                <div className="flex flex-col text-start border-zinc-400 border-l-[1px] p-2 ml-5 ">
                    <span>{comment.body}</span>
                    <button
                        className="border-zinc-400 border-[1px] rounded-md w-fit p-3"
                        onClick={() => toggleReply(index)}
                    >
                        {isReply[index] ? "Cancel" : "Reply"}
                    </button>

                    {isReply[index] && (
                        <>
                            <CommentInput onComment={onComment} />

                            <CommentItems comments={comments} />
                        </>
                    )}
                </div>
            ))}
        </>
    );
};
