export interface IAudit
{

    updated_at: string

    created_at: string;
}

// needed for a correct type checking
export interface IAuditModelCreation
{
    updated_at?: string

    created_at?: string;
}