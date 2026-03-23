export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accesses: {
        Row: {
          boat_id: string;
          created_at: string;
          id: string;
          role: Database['public']['Enums']['access_role'];
          user_id: string;
        };
        Insert: {
          boat_id: string;
          created_at?: string;
          id?: string;
          role?: Database['public']['Enums']['access_role'];
          user_id: string;
        };
        Update: {
          boat_id?: string;
          created_at?: string;
          id?: string;
          role?: Database['public']['Enums']['access_role'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'accesses_boat_id_fkey';
            columns: ['boat_id'];
            isOneToOne: false;
            referencedRelation: 'boats';
            referencedColumns: ['id'];
          },
        ];
      };
      boats: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      equipment_attachments: {
        Row: {
          description: string | null;
          equipment_id: string;
          file_name: string;
          file_path: string;
          file_type: string | null;
          id: string;
          type: string;
          uploaded_at: string;
        };
        Insert: {
          description?: string | null;
          equipment_id: string;
          file_name: string;
          file_path: string;
          file_type?: string | null;
          id?: string;
          type?: string;
          uploaded_at?: string;
        };
        Update: {
          description?: string | null;
          equipment_id?: string;
          file_name?: string;
          file_path?: string;
          file_type?: string | null;
          id?: string;
          type?: string;
          uploaded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'equipment_attachments_equipment_id_fkey';
            columns: ['equipment_id'];
            isOneToOne: false;
            referencedRelation: 'equipments';
            referencedColumns: ['id'];
          },
        ];
      };
      equipments: {
        Row: {
          boat_id: string;
          brand: string | null;
          created_at: string;
          description: string | null;
          id: string;
          model: string | null;
          name: string;
          purchase_date: string | null;
          purchase_value: number | null;
          quantity: number;
          serial_number: string | null;
          system_key: string;
          warranty_end_date: string | null;
        };
        Insert: {
          boat_id: string;
          brand?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          model?: string | null;
          name: string;
          purchase_date?: string | null;
          purchase_value?: number | null;
          quantity?: number;
          serial_number?: string | null;
          system_key: string;
          warranty_end_date?: string | null;
        };
        Update: {
          boat_id?: string;
          brand?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          model?: string | null;
          name?: string;
          purchase_date?: string | null;
          purchase_value?: number | null;
          quantity?: number;
          serial_number?: string | null;
          system_key?: string;
          warranty_end_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'equipments_boat_id_fkey';
            columns: ['boat_id'];
            isOneToOne: false;
            referencedRelation: 'boats';
            referencedColumns: ['id'];
          },
        ];
      };
      intervention_attachments: {
        Row: {
          description: string | null;
          file_name: string;
          file_path: string;
          file_type: string | null;
          id: string;
          intervention_id: string;
          type: string;
          uploaded_at: string;
        };
        Insert: {
          description?: string | null;
          file_name: string;
          file_path: string;
          file_type?: string | null;
          id?: string;
          intervention_id: string;
          type?: string;
          uploaded_at?: string;
        };
        Update: {
          description?: string | null;
          file_name?: string;
          file_path?: string;
          file_type?: string | null;
          id?: string;
          intervention_id?: string;
          type?: string;
          uploaded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'intervention_attachments_intervention_id_fkey';
            columns: ['intervention_id'];
            isOneToOne: false;
            referencedRelation: 'interventions';
            referencedColumns: ['id'];
          },
        ];
      };
      interventions: {
        Row: {
          boat_id: string;
          created_at: string;
          date: string;
          description: string | null;
          id: string;
          labor_cost: number | null;
          supply_cost: number | null;
          title: string;
          total_cost: number | null;
        };
        Insert: {
          boat_id: string;
          created_at?: string;
          date: string;
          description?: string | null;
          id?: string;
          labor_cost?: number | null;
          supply_cost?: number | null;
          title: string;
          total_cost?: number | null;
        };
        Update: {
          boat_id?: string;
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: string;
          labor_cost?: number | null;
          supply_cost?: number | null;
          title?: string;
          total_cost?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'interventions_boat_id_fkey';
            columns: ['boat_id'];
            isOneToOne: false;
            referencedRelation: 'boats';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_equipment_access: {
        Args: { equipment_id: string };
        Returns: boolean;
      };
      check_intervention_access: {
        Args: { intervention_id: string };
        Returns: boolean;
      };
      has_boat_access: {
        Args: { boat: string };
        Returns: boolean;
      };
    };
    Enums: {
      access_role: 'owner' | 'operator' | 'viewer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      access_role: ['owner', 'operator', 'viewer'],
    },
  },
} as const;
