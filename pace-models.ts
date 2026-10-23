// Modelos PACE (independentes da UI). NÃO compilados nem testados neste ambiente.
export type Sport='bike'|'run'|'swim';
export type Role='admin'|'moderator'|'mentor'|'athlete';
export type Ts=number; // epoch ms (em Firestore: Timestamp)
export interface AthletePublic{id:string;username:string;displayName:string;photoURL?:string;bio?:string;country:string;city:string;sports:Sport[];targetRaceId?:string;targetTimeSeconds?:number;targetTimeVisibility:'public'|'hidden';role:Role;verifiedProfessional:boolean;organizedCount:number;joinedCount:number;createdAt:Ts}
// Dados privados em documento separado (users_private/{uid}), nunca legíveis por outros.
export interface AthletePrivate{id:string;email:string;privacySettings:{showGoal:boolean};notificationPrefs?:Record<string,boolean>;updatedAt:Ts}
export interface Race{id:string;name:string;slug:string;country:string;city:string;eventDate?:string;dateConfirmed:boolean;imageURL?:string;description?:string;officialWebsite?:string;status:'draft'|'published'|'archived';createdAt:Ts;updatedAt:Ts}
export interface Channel{id:string;raceId:string;name:string;description?:string;memberCount:number;createdAt:Ts}
export interface ChannelMembership{id:string;channelId:string;athleteId:string;joinedAt:Ts;role:Role;notificationPreferences?:Record<string,boolean>}
export interface Activity{id:string;channelId:string;raceId:string;organizerId:string;sport:Sport;title:string;description:string;startAt:Ts;meetingPointName:string;meetingPointAddress?:string;latitude?:number;longitude?:number;distanceKm:number;paceSecondsPerKm?:number;averageSpeedKmh?:number;elevationGainM?:number;estimatedDurationMinutes?:number;difficulty:'easy'|'moderate'|'hard';maxParticipants?:number;unlimitedParticipants:boolean;participantCount:number;beginnerFriendly:boolean;status:'open'|'cancelled'|'done';createdAt:Ts;updatedAt:Ts}
export interface ActivityParticipant{id:string;activityId:string;athleteId:string;status:'confirmed'|'left';joinedAt:Ts}
export interface Message{id:string;channelId:string;authorId:string;text:string;createdAt:Ts;updatedAt?:Ts;type:'text'|'activity';activityId?:string;moderationStatus:'ok'|'reported'|'removed'}
export interface Professional{id:string;name:string;slug:string;category:'bikefit'|'physio'|'nutrition'|'other';description:string;city:string;country:string;address?:string;website?:string;contact?:string;services:string[];verified:boolean;partnerStatus:'none'|'partner';imageURL?:string;createdAt:Ts}
export interface Notification{id:string;recipientId:string;type:string;title:string;body:string;entityType:'activity'|'channel'|'message';entityId:string;readAt?:Ts;createdAt:Ts}
// Validação mínima (usar também no servidor)
export const validateActivity=(a:Partial<Activity>):string[]=>{const e:string[]=[];if(!a.title||a.title.length<3)e.push('title');if(!(a.distanceKm!>0))e.push('distanceKm');if(!a.unlimitedParticipants&&!((a.maxParticipants??0)>=2))e.push('maxParticipants');if(a.sport==='bike'&&a.paceSecondsPerKm)e.push('pace não aplicável a bike');return e};
