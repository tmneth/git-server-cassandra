import cassandra from "cassandra-driver";

const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  protocolOptions: {
    port: 9042,
  },
  localDataCenter: "datacenter1",
  keyspace: "git_server",
});

client.connect();

export default client;
