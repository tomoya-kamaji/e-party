create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, auth_id, email, name, image_url, created_at, updated_at)
  values (
    new.id, 
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'name', ''), 
    coalesce(new.raw_user_meta_data->>'picture', ''), 
    now(), 
    now()
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_auth_user();