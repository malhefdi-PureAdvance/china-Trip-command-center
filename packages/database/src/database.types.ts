export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Timestamp = string;
type DateString = string;
type Uuid = string;

export type Database = {
  public: {
    Tables: {
      business_visit_data_standards: {
        Row: {
          id: string;
          version: string;
          required_fields: string[];
          blocked_sensitive_fields: string[];
          notes: string;
          created_at: Timestamp;
        };
        Insert: {
          id: string;
          version: string;
          required_fields: string[];
          blocked_sensitive_fields: string[];
          notes: string;
          created_at?: Timestamp;
        };
        Update: {
          id?: string;
          version?: string;
          required_fields?: string[];
          blocked_sensitive_fields?: string[];
          notes?: string;
          created_at?: Timestamp;
        };
        Relationships: [];
      };
      trips: {
        Row: {
          id: Uuid;
          team_id: Uuid;
          name: string;
          slug: string;
          status: Database["public"]["Enums"]["trip_status"];
          region: string;
          starts_on: DateString;
          ends_on: DateString;
          summary: string | null;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          team_id: Uuid;
          name: string;
          slug: string;
          status?: Database["public"]["Enums"]["trip_status"];
          region: string;
          starts_on: DateString;
          ends_on: DateString;
          summary?: string | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: Uuid;
          team_id?: Uuid;
          name?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["trip_status"];
          region?: string;
          starts_on?: DateString;
          ends_on?: DateString;
          summary?: string | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [];
      };
      business_targets: {
        Row: {
          id: Uuid;
          trip_id: Uuid;
          name: string;
          city: string;
          country: string;
          sector: string;
          status: Database["public"]["Enums"]["business_target_status"];
          priority_rank: number | null;
          source_confidence: Database["public"]["Enums"]["source_confidence"];
          last_checked_at: Timestamp | null;
          owner_user_id: Uuid | null;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          trip_id: Uuid;
          name: string;
          city: string;
          country: string;
          sector: string;
          status?: Database["public"]["Enums"]["business_target_status"];
          priority_rank?: number | null;
          source_confidence?: Database["public"]["Enums"]["source_confidence"];
          last_checked_at?: Timestamp | null;
          owner_user_id?: Uuid | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: Uuid;
          trip_id?: Uuid;
          name?: string;
          city?: string;
          country?: string;
          sector?: string;
          status?: Database["public"]["Enums"]["business_target_status"];
          priority_rank?: number | null;
          source_confidence?: Database["public"]["Enums"]["source_confidence"];
          last_checked_at?: Timestamp | null;
          owner_user_id?: Uuid | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [];
      };
      itinerary_items: {
        Row: {
          id: Uuid;
          trip_id: Uuid;
          location_id: Uuid | null;
          title: string;
          kind: Database["public"]["Enums"]["itinerary_item_kind"];
          status: Database["public"]["Enums"]["itinerary_item_status"];
          starts_at: Timestamp;
          ends_at: Timestamp;
          timezone: string;
          owner_user_id: Uuid | null;
          notes: string | null;
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          trip_id: Uuid;
          location_id?: Uuid | null;
          title: string;
          kind: Database["public"]["Enums"]["itinerary_item_kind"];
          status?: Database["public"]["Enums"]["itinerary_item_status"];
          starts_at: Timestamp;
          ends_at: Timestamp;
          timezone: string;
          owner_user_id?: Uuid | null;
          notes?: string | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: Uuid;
          trip_id?: Uuid;
          location_id?: Uuid | null;
          title?: string;
          kind?: Database["public"]["Enums"]["itinerary_item_kind"];
          status?: Database["public"]["Enums"]["itinerary_item_status"];
          starts_at?: Timestamp;
          ends_at?: Timestamp;
          timezone?: string;
          owner_user_id?: Uuid | null;
          notes?: string | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          id: Uuid;
          trip_id: Uuid;
          author_user_id: Uuid;
          title: string;
          body: string;
          visibility: Database["public"]["Enums"]["note_visibility"];
          tags: string[];
          created_at: Timestamp;
          updated_at: Timestamp;
        };
        Insert: {
          id?: Uuid;
          trip_id: Uuid;
          author_user_id: Uuid;
          title: string;
          body: string;
          visibility?: Database["public"]["Enums"]["note_visibility"];
          tags?: string[];
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Update: {
          id?: Uuid;
          trip_id?: Uuid;
          author_user_id?: Uuid;
          title?: string;
          body?: string;
          visibility?: Database["public"]["Enums"]["note_visibility"];
          tags?: string[];
          created_at?: Timestamp;
          updated_at?: Timestamp;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      trip_status: "planning" | "active" | "complete" | "archived";
      itinerary_item_kind:
        | "flight"
        | "train"
        | "transfer"
        | "hotel"
        | "meeting"
        | "site_visit"
        | "meal"
        | "buffer"
        | "admin";
      itinerary_item_status:
        "draft" | "proposed" | "confirmed" | "changed" | "cancelled" | "complete";
      note_visibility: "private" | "team" | "trip";
      business_target_status:
        | "candidate"
        | "source_needed"
        | "researched"
        | "profiled"
        | "reviewed"
        | "submission_ready"
        | "submitted"
        | "scheduled"
        | "visited"
        | "follow_up"
        | "archived";
      source_confidence: "unknown" | "low" | "medium" | "high" | "verified";
    };
    CompositeTypes: Record<string, never>;
  };
};
