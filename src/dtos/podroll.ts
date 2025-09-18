import { DTOChannel } from "./channel/channel";
import { DTOItem } from "./item/item";

export interface PodrollItem extends DTOItem {
  channel: DTOChannel;
}

export interface DTOPodroll {
  podrollChannels: DTOChannel[];
  podrollItems: PodrollItem[];
};
