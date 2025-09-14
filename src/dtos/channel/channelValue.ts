import { DTOChannelValueRecipient } from "./channelValueRecipient";

export interface DTOChannelValue {
  id: number;
  channel_id: number;
  type: string;
  method: string;
  suggested: number | null;
  channel_value_recipients: DTOChannelValueRecipient[];
}
