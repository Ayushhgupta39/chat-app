import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket server...");
    this._io = new Server({
        cors: {
            allowedHeaders: ["*"],
            origin: "*",
        }
    });
  }

  public initListeners() {
    console.log("Initialize Socket listeners...");
    const io = this._io;
    io.on("connect", (socket) => {
      console.log(`New socket connected:`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message received: ${message}`);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
