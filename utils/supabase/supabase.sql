-- SocialLink -> portfolio_social_link
create table if not exists public.portfolio_social_link (
  platform  text not null,
  url       text not null
  );

-- Profile -> portfolio_profile
create table if not exists public.portfolio_profile (
  name      text not null,
  title     text not null,
  summary   text not null,
  summary2  text not null,
  summary3  text not null,
  location  text not null,
  email     text not null,
  yearsexperience integer not null
);

-- Skill -> portfolio_skill
create table if not exists public.portfolio_skill (
  id        serial primary key,
  name      text not null,
  category  text not null,
  level     integer not null
);

-- Project -> portfolio_project
create table if not exists public.portfolio_project (
  id           serial primary key,
  title        text not null,
  description  text not null,
  technologies text not null,
  image        text not null,
  demourl      text,
  repourl      text
);

-- Experience -> portfolio_experience
create table if not exists public.portfolio_experience (
  id          serial primary key,
  role        text not null,
  company     text not null,
  period      text not null,
  description text not null
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.portfolio_profile) THEN
        INSERT INTO public.portfolio_profile (name, title, summary, location, email)
        VALUES (
            'Hassan Mostafa',
            'Software Engineer',
            'Passionate developer with experience in building web applications.',
            'Tripoli, Lebanon',
            'mohamad.hm464@gmail.com'
        );
    END IF;
END $$;