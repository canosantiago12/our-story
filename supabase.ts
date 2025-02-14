export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Album: {
        Row: {
          albumDate: string
          createdAt: string
          description: string | null
          id: string
          thumbnail_id: string | null
          title: string
          updatedAt: string
        }
        Insert: {
          albumDate: string
          createdAt?: string
          description?: string | null
          id: string
          thumbnail_id?: string | null
          title: string
          updatedAt: string
        }
        Update: {
          albumDate?: string
          createdAt?: string
          description?: string | null
          id?: string
          thumbnail_id?: string | null
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Album_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["id"]
          },
        ]
      }
      AlbumImage: {
        Row: {
          albumId: string
          imageId: string
        }
        Insert: {
          albumId: string
          imageId: string
        }
        Update: {
          albumId?: string
          imageId?: string
        }
        Relationships: [
          {
            foreignKeyName: "AlbumImage_albumId_fkey"
            columns: ["albumId"]
            isOneToOne: false
            referencedRelation: "Album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AlbumImage_imageId_fkey"
            columns: ["imageId"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["id"]
          },
        ]
      }
      Image: {
        Row: {
          caption: string | null
          id: string
          uploadedAt: string
          url: string
        }
        Insert: {
          caption?: string | null
          id: string
          uploadedAt?: string
          url: string
        }
        Update: {
          caption?: string | null
          id?: string
          uploadedAt?: string
          url?: string
        }
        Relationships: []
      }
      Story: {
        Row: {
          createdAt: string
          id: string
          storyDate: string
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          storyDate: string
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          storyDate?: string
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      StoryImage: {
        Row: {
          imageId: string
          storyId: string
        }
        Insert: {
          imageId: string
          storyId: string
        }
        Update: {
          imageId?: string
          storyId?: string
        }
        Relationships: [
          {
            foreignKeyName: "StoryImage_imageId_fkey"
            columns: ["imageId"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "StoryImage_storyId_fkey"
            columns: ["storyId"]
            isOneToOne: false
            referencedRelation: "Story"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
