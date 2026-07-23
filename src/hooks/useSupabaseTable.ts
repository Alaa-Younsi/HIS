import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * CRUD générique pour une table du tableau de bord (authenticated = accès
 * complet, voir supabase/migrations/0002_rls.sql). Toutes les pages admin de
 * contenu (services, réalisations, secteurs...) partagent cette même logique
 * — seule la forme de `Row` et la table changent.
 */
export function useSupabaseTable<Row extends { id: string }>(table: string, orderColumn = 'sort_order') {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from(table)
      .select('*')
      .order(orderColumn, { ascending: true });
    if (queryError) setError(queryError.message);
    else {
      setError(null);
      setRows((data ?? []) as Row[]);
    }
    setLoading(false);
  }, [table, orderColumn]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = async (values: Partial<Row>) => {
    if (!supabase) throw new Error('Supabase non configuré — voir SUPABASE_SETUP.md');
    // Sans générique Database câblé (voir src/lib/supabase.ts), le client ne peut
    // pas déduire la forme exacte d'une table à partir de son nom en chaîne —
    // `Row` est déjà la source de vérité ici (src/types/db.ts).
    const { error: insertError } = await supabase.from(table).insert(values as never);
    if (insertError) throw insertError;
    await reload();
  };

  const update = async (id: string, values: Partial<Row>) => {
    if (!supabase) throw new Error('Supabase non configuré — voir SUPABASE_SETUP.md');
    const { error: updateError } = await supabase.from(table).update(values as never).eq('id', id);
    if (updateError) throw updateError;
    await reload();
  };

  const remove = async (id: string) => {
    if (!supabase) throw new Error('Supabase non configuré — voir SUPABASE_SETUP.md');
    const { error: deleteError } = await supabase.from(table).delete().eq('id', id);
    if (deleteError) throw deleteError;
    await reload();
  };

  return { rows, loading, error, reload, create, update, remove };
}
