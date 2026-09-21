export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agent_decisions: {
        Row: {
          asset_symbol: string | null
          assumptions: Json
          confidence: number | null
          created_at: string
          data_used: Json
          id: string
          model_view: string
          risk_level: string | null
          risks: Json
          thread_id: string | null
          user_id: string
        }
        Insert: {
          asset_symbol?: string | null
          assumptions?: Json
          confidence?: number | null
          created_at?: string
          data_used?: Json
          id?: string
          model_view: string
          risk_level?: string | null
          risks?: Json
          thread_id?: string | null
          user_id: string
        }
        Update: {
          asset_symbol?: string | null
          assumptions?: Json
          confidence?: number | null
          created_at?: string
          data_used?: Json
          id?: string
          model_view?: string
          risk_level?: string | null
          risks?: Json
          thread_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_decisions_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "agent_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_messages: {
        Row: {
          ai_message_id: string | null
          created_at: string
          id: string
          parts: Json
          role: string
          thread_id: string
          user_id: string
        }
        Insert: {
          ai_message_id?: string | null
          created_at?: string
          id?: string
          parts?: Json
          role: string
          thread_id: string
          user_id: string
        }
        Update: {
          ai_message_id?: string | null
          created_at?: string
          id?: string
          parts?: Json
          role?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "agent_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_policies: {
        Row: {
          allowed_assets: string[]
          daily_limit: number | null
          excluded_assets: string[]
          id: string
          max_position_percent: number | null
          max_transaction: number | null
          rebalancing_mode: string
          trading_enabled: boolean
          updated_at: string
          user_id: string
          withdrawals_enabled: boolean
        }
        Insert: {
          allowed_assets?: string[]
          daily_limit?: number | null
          excluded_assets?: string[]
          id?: string
          max_position_percent?: number | null
          max_transaction?: number | null
          rebalancing_mode?: string
          trading_enabled?: boolean
          updated_at?: string
          user_id: string
          withdrawals_enabled?: boolean
        }
        Update: {
          allowed_assets?: string[]
          daily_limit?: number | null
          excluded_assets?: string[]
          id?: string
          max_position_percent?: number | null
          max_transaction?: number | null
          rebalancing_mode?: string
          trading_enabled?: boolean
          updated_at?: string
          user_id?: string
          withdrawals_enabled?: boolean
        }
        Relationships: []
      }
      agent_threads: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          alert_type: string
          asset_symbol: string | null
          condition: Json
          created_at: string
          enabled: boolean
          id: string
          user_id: string
        }
        Insert: {
          alert_type: string
          asset_symbol?: string | null
          condition?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          asset_symbol?: string | null
          condition?: Json
          created_at?: string
          enabled?: boolean
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          preferences: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          preferences?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          preferences?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          content: Json
          created_at: string
          id: string
          report_type: string
          title: string
          user_id: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          report_type: string
          title: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          report_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_usdc: number | null
          asset_symbol: string | null
          created_at: string
          decision_id: string | null
          details: Json
          id: string
          network: string
          status: string
          transaction_hash: string | null
          user_id: string
        }
        Insert: {
          amount_usdc?: number | null
          asset_symbol?: string | null
          created_at?: string
          decision_id?: string | null
          details?: Json
          id?: string
          network?: string
          status?: string
          transaction_hash?: string | null
          user_id: string
        }
        Update: {
          amount_usdc?: number | null
          asset_symbol?: string | null
          created_at?: string
          decision_id?: string | null
          details?: Json
          id?: string
          network?: string
          status?: string
          transaction_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "agent_decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist_items: {
        Row: {
          asset_symbol: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          asset_symbol: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          asset_symbol?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
