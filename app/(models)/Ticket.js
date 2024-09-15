import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODG.URI);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    id: Int16Array,
    description: String,
    estatus: String,
    valor: Boolean,
    sector_de_fuga: Int16Array,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
