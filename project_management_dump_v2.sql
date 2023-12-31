--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE project_management;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:CW8PDfoWL+a9rLslf5wdTA==$YNxmW+EZwjoql1QrjbpGN2LsgO8UwT74vTNUTh7XVYY=:B6b4x3YUCaBiMdeT4CIpqnxl2ET1H7UgSAbvc4gkq4w=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "project_management" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: project_management; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE project_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE project_management OWNER TO postgres;

\connect project_management

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'TODO',
    'INPROGRESS',
    'DONE'
);


ALTER TYPE public."Status" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    password text NOT NULL,
    phone_number text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone,
    client_id text NOT NULL,
    duration integer NOT NULL,
    status public."Status" DEFAULT 'TODO'::public."Status" NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
100e5722-3e4c-4101-ac60-01d31ae5a6bb	7e644bd4d4348c088eaddb293594bb867ce70d5c5e3f618da6a084e07f30962d	2023-06-22 14:50:10.847468+00	20230505131907_init	\N	\N	2023-06-22 14:50:10.689559+00	1
57c1ed7d-02c0-4b7b-b1dc-c7e654c07ab0	2ecc8ceb31a3027a034e0fd20190d14abd2866763ff4edeb4c85d2d17bb4c367	2023-06-22 14:50:11.039767+00	20230505134939_init	\N	\N	2023-06-22 14:50:10.858923+00	1
7971c841-e52f-4185-977f-53aa86997d18	c119691544fb012b302cf8661a876698789b12f5bff467b5b3ed4f42435bed8e	2023-06-22 14:50:11.229647+00	20230505135406_initv3	\N	\N	2023-06-22 14:50:11.05256+00	1
14716dbe-9743-4272-8e25-1f933c10e166	c6eb8888e3cde5e6c7e6865000d9f9d4a785fb15f150065d85df0c188c5def22	2023-06-22 14:50:11.282449+00	20230511212554_make_created_at_andupdated_at_optional	\N	\N	2023-06-22 14:50:11.247418+00	1
e221dfd3-c3fd-48b1-9fd9-59806306228e	583555ad33fc8f059132b93f2c558e0ea64b3be1a2c9cb804d33fe77b42e6294	2023-06-22 14:50:11.351821+00	20230511234045_make_created_at_andupdated_at_optional	\N	\N	2023-06-22 14:50:11.295354+00	1
c36d4b13-7927-4519-9a1d-46320eb47cce	c9ea08ad9dfcb670d968dfc1df6102f8d223ee51423ed78a396f55d4a0cc85b3	2023-06-22 14:50:11.475936+00	20230512000548_make_created_at_andupdated_at_optional	\N	\N	2023-06-22 14:50:11.371847+00	1
594abf20-f071-4bac-9a14-fb3889138658	880211defdb8cf14b34f38d7b22e88b339134c55e9a48a1962486a8fdc5d04e4	2023-06-22 14:50:11.592651+00	20230515113602_add_image_table	\N	\N	2023-06-22 14:50:11.493701+00	1
95ed4c9d-2a3c-45b9-893c-931e88e0259e	b694a87ce7d27f7cba503b087e370185157ccab4dc4f663c0a69421081d0fa37	2023-06-22 14:50:11.763286+00	20230520163039_adds_category	\N	\N	2023-06-22 14:50:11.609331+00	1
12fb5bbb-eee7-4935-ab2a-b99b0d8d8120	2c1f48e40aa5fd7c87d1f409043ef03059a6b13eb6a53af2ca3ae8ac8fd38680	2023-06-22 14:50:11.913266+00	20230520223855_add_explicit_category_product_relationship	\N	\N	2023-06-22 14:50:11.780513+00	1
cb3826fe-c74c-47a8-a897-fcef1a82bc8a	b6fb07401700af63a07fa6967b63bd5f8e8f381f0f8692ff7b8d09fce50f4c5a	2023-06-22 14:50:11.997159+00	20230521102126_make_category_name_unique	\N	\N	2023-06-22 14:50:11.930225+00	1
0a6c2f93-4fd8-49aa-b82e-c0d2b7619b82	be50e584b27adc1fdfd995b216f5b6424cccb4a0b9c7e147c9f0fc7b0bda2989	2023-06-22 14:50:12.116937+00	20230619231719_create_clients_and_projects_table	\N	\N	2023-06-22 14:50:12.016506+00	1
739ecf1f-1385-44a3-83ab-40e84aa9e9ae	543253e64ff92f01770b4cf23030a5df6b5c4104d2f4ce377f1c901d07a74fbb	2023-06-23 13:43:54.204755+00	20230623134354_adds_roles_and_status	\N	\N	2023-06-23 13:43:54.178998+00	1
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, first_name, last_name, email, created_at, updated_at, password, phone_number, role) FROM stdin;
e0b1edfe-8aa7-475e-ad5c-c6ed24cf8a5d	Moses	Snowden	Snowdenmoses@gmail.com	2023-06-22 22:31:00.714	2023-06-22 22:31:00.714	$2b$10$eGgfEMgTiW8SU2jSWpZtuu1qdoZOrrwAZPq2qgSsJZc.GD.aIGX6q	098887	USER
8541a6a2-ce31-49cd-816e-5d2dff87ae24	Jeremiah	Adaji	jeremiahadaji@gmail.com	2023-06-23 13:00:01.566	2023-06-23 13:00:01.566	$2b$10$wiNSjT8qcLm.bNlRaaUFvezPzJQLRCGxWqlSmRuXUNvVjxs9RLeae	123455	USER
7ea753ed-3b95-491f-a892-315131182ec8	Ruth	Kana	ruth@gmail.com	2023-06-23 14:31:29.747	2023-06-23 14:31:29.747	$2b$10$gGntvaCy0TNg0dOamAzF5OL4PSan.yttE2/T/mMazZ5VzGN5nifYS	09888	USER
1ee5c472-a4e6-41fb-bbe0-861e7c4a81ee	Segun	Sunday	segun@gmail.com	2023-06-23 14:41:25.643	2023-06-23 14:41:25.643	$2b$10$hoxvchMs7aliJON/YPu/1uXnbst80840eP2D7OvGPY34Pv6DRbMmm	13245	USER
38ad9d13-7a03-4c63-a392-1f3158d119aa	Rebecca	Kana	rebecca@gmail.com	2023-06-23 14:42:38.402	2023-06-23 14:42:38.402	$2b$10$9O3Pp9IpoM9t6z/fmJxwwOnjYKuLZ.2M3hJidkTyDu1nbSYeMHazC	09087	ADMIN
14c7798c-5730-4045-9bba-a32c969da1df	Eddidiong 	Akpan	eddy@gmail.com	2023-06-25 11:51:42.791	2023-06-25 11:51:42.791	$2b$10$cQ3y2TYs/MKHzvijmh4lQ.sai.YYixdGHqE3GphFRapYoNwrGRUMy	098099	USER
18be22a4-edf3-4105-916c-6e7600cf91a0	Anna	Emmanuel	anna@gmail.com	2023-06-25 11:55:43.206	2023-06-25 11:55:43.206	$2b$10$U5OyrMymfthRepvoHqg7d.nchmAbr77uToKIuO.NB26Bky/Xp.gVW	08077	ADMIN
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, created_at, updated_at, client_id, duration, status) FROM stdin;
09f950c5-e882-4d69-a73a-1b4980e4e51b	Build Android app	Create an android phone application	2023-06-22 22:34:52.048	2023-06-22 22:34:52.048	e0b1edfe-8aa7-475e-ad5c-c6ed24cf8a5d	2	TODO
174c621e-1c41-4a5a-a8ba-d4a0cb18aee0	Leave Module	Design leave module on ERP	2023-06-23 08:51:25.978	2023-06-25 22:10:48.997	1ee5c472-a4e6-41fb-bbe0-861e7c4a81ee	30	INPROGRESS
dfd7d865-ac87-4f9e-9938-9540f029ac0b	Designations	create controller, model, route, and spec for designation	2023-06-25 13:56:19.101	2023-06-25 22:29:52.148	e0b1edfe-8aa7-475e-ad5c-c6ed24cf8a5d	35	TODO
4c053f06-4087-42d1-9e05-ea3e0d50f154	Department	Create a chart that shows all employees by department	2023-06-25 01:26:02.094	2023-06-25 22:30:23.937	8541a6a2-ce31-49cd-816e-5d2dff87ae24	1	TODO
b7e79ad8-e1ed-428d-be3f-910f0acc040a	Time and Attendance	Use employee clock in and clock out details to make salary deductions	2023-06-23 15:00:36.159	2023-06-25 22:31:03.77	14c7798c-5730-4045-9bba-a32c969da1df	4	TODO
d038fccd-8e2e-4754-9826-9ab57da4cfe7	Employee Shift	Create employeeShift model, interface, dto, service, controller and route	2023-06-23 12:00:35.976	2023-06-25 22:31:30.42	18be22a4-edf3-4105-916c-6e7600cf91a0	7	TODO
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: clients_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX clients_email_key ON public.clients USING btree (email);


--
-- Name: projects projects_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

