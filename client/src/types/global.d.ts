//we can use the types created here globally without exporting them

type ChatType = {
    id: string;
    fullName: string;
    profilePic: string;
};

type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: string;
    shouldShake?: boolean;
};