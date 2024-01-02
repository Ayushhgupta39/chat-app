import { Server } from "socket.io";
import Redis from "ioredis";

// pub stands for publisher
const pub = new Redis({
  host: "redis-23be96a7-ayushforwork390-77fc.a.aivencloud.com",
  port: 14580,
  username: "default",
  password: "AVNS_ijyouc63CoVkadvy2r_",
});

// sub stands for subscriber
const sub = new Redis({
  host: "redis-23be96a7-ayushforwork390-77fc.a.aivencloud.com",
  port: 14580,
  username: "default",
  password: "AVNS_ijyouc63CoVkadvy2r_",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket server...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES")
  }

  public initListeners() {
    console.log("Initialize Socket listeners...");
    const io = this._io;
    io.on("connect", (socket) => {
      console.log(`New socket connected:`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message received: ${message}`);
        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
        if (channel === 'MESSAGES') {
            io.emit("message", message);
        }
    })
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
