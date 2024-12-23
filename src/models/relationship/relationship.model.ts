import { ERelationshipStatus, ERelationshipType } from "../../utils/enum/relationship.enum";

export interface IRelationship {
  id: string;
  fromUserId: string;
  toUserId: string;
  relationshipType: ERelationshipType;
  status: ERelationshipStatus
}

export interface ICreateRelationship {
    fromUserId: string;
    toUserId: string;
    relationshipType: ERelationshipType;
    relationshipStatus: ERelationshipStatus
  }
