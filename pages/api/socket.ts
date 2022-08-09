import { Server } from "socket.io";

const commands: any = {
  dm: {
    desc: "DM a user",
    params: "{userId | displayName}",
    help: "/dm {user's ID or name}",
  },
};

const socketHandler = async (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("Starting socket.io");
    const io = new Server(res.socket.server);

    io.on("connection", async (socket) => {
      socket.broadcast.emit("a user connected", socket.id);

      socket.on(
        "SignUpRequest",
        async (formFields: any, onSubmitFetch: string) => {
          socket.emit("SignUpReceive", { ...formFields, socketId: socket.id });
        }
      );
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default socketHandler;
