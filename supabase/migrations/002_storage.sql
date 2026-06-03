-- Bucket público para la galería de fotos
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Política: solo service_role puede subir/borrar
create policy "gallery_public_read"
  on storage.objects for select
  using ( bucket_id = 'gallery' );

create policy "gallery_service_insert"
  on storage.objects for insert
  with check ( bucket_id = 'gallery' );

create policy "gallery_service_delete"
  on storage.objects for delete
  using ( bucket_id = 'gallery' );

-- Política para escritura en projects, gallery_images y site_content desde server
create policy "projects_service_write"
  on public.projects for all
  using (true) with check (true);

create policy "gallery_images_service_write"
  on public.gallery_images for all
  using (true) with check (true);

create policy "site_content_service_write"
  on public.site_content for all
  using (true) with check (true);

create policy "contact_messages_service_all"
  on public.contact_messages for all
  using (true) with check (true);
