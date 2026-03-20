<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laravel + React Employee CRUD — Full Guide</title>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap"
    rel="stylesheet">
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #21262d;
      --accent: #58a6ff;
      --accent2: #3fb950;
      --accent3: #d2a8ff;
      --accent4: #ffa657;
      --text: #c9d1d9;
      --muted: #8b949e;
      --heading: #f0f6fc;
      --danger: #f85149;
      --tag-bg: #1f2937;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      line-height: 1.7;
    }

    .hero {
      background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
      border-bottom: 1px solid var(--border);
      padding: 60px 40px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(88, 166, 255, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero h1 {
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--heading);
      letter-spacing: -1px;
    }

    .hero h1 span {
      color: var(--accent);
    }

    .hero p {
      color: var(--muted);
      margin-top: 12px;
      font-size: 1.05rem;
    }

    .stack-badges {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .badge {
      background: var(--tag-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 4px 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: var(--accent);
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }

    .toc {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px 32px;
      margin-bottom: 48px;
    }

    .toc h2 {
      color: var(--heading);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 16px;
      color: var(--muted);
    }

    .toc ol {
      padding-left: 20px;
    }

    .toc li {
      margin: 6px 0;
    }

    .toc a {
      color: var(--accent);
      text-decoration: none;
      font-size: 0.95rem;
    }

    .toc a:hover {
      text-decoration: underline;
    }

    .step {
      margin-bottom: 60px;
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .step-num {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--accent);
      color: #0d1117;
      font-weight: 800;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .step-num.green {
      background: var(--accent2);
    }

    .step-num.purple {
      background: var(--accent3);
      color: #0d1117;
    }

    .step-num.orange {
      background: var(--accent4);
      color: #0d1117;
    }

    .step-num.red {
      background: var(--danger);
    }

    .step-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--heading);
    }

    .step-sub {
      color: var(--muted);
      font-size: 0.88rem;
    }

    .info-box {
      background: rgba(88, 166, 255, 0.08);
      border: 1px solid rgba(88, 166, 255, 0.25);
      border-radius: 8px;
      padding: 14px 18px;
      margin: 16px 0;
      font-size: 0.9rem;
      color: var(--text);
    }

    .info-box strong {
      color: var(--accent);
    }

    .warn-box {
      background: rgba(255, 166, 87, 0.08);
      border: 1px solid rgba(255, 166, 87, 0.25);
      border-radius: 8px;
      padding: 14px 18px;
      margin: 16px 0;
      font-size: 0.9rem;
    }

    .warn-box strong {
      color: var(--accent4);
    }

    pre {
      background: #010409;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 24px;
      overflow-x: auto;
      margin: 16px 0;
      position: relative;
    }

    pre .label {
      position: absolute;
      top: 10px;
      right: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--muted);
      background: var(--border);
      padding: 2px 8px;
      border-radius: 4px;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.7;
      color: var(--text);
    }

    pre code {
      color: var(--text);
    }

    .kw {
      color: #ff7b72;
    }

    .str {
      color: #a5d6ff;
    }

    .fn {
      color: #d2a8ff;
    }

    .cm {
      color: #8b949e;
      font-style: italic;
    }

    .num {
      color: #79c0ff;
    }

    .cls {
      color: #ffa657;
    }

    h3 {
      color: var(--heading);
      font-size: 1.1rem;
      font-weight: 700;
      margin: 28px 0 10px;
    }

    h4 {
      color: var(--accent3);
      font-size: 0.95rem;
      font-weight: 600;
      margin: 20px 0 8px;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
    }

    p {
      color: var(--text);
      margin: 10px 0;
      font-size: 0.95rem;
    }

    ul,
    ol {
      padding-left: 22px;
      margin: 10px 0;
    }

    li {
      margin: 5px 0;
      font-size: 0.95rem;
    }

    .file-tree {
      background: #010409;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.8;
      color: var(--text);
    }

    .file-tree .dir {
      color: var(--accent4);
    }

    .file-tree .file {
      color: var(--accent2);
    }

    .file-tree .comment {
      color: var(--muted);
    }

    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 40px 0;
    }

    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      font-size: 0.88rem;
    }

    .card strong {
      color: var(--heading);
      display: block;
      margin-bottom: 6px;
    }

    @media(max-width: 640px) {
      .grid2 {
        grid-template-columns: 1fr;
      }

      .hero h1 {
        font-size: 1.8rem;
      }
    }
  </style>
</head>

<body>

  <div class="hero">
    <h1>Laravel + <span>React</span> Employee CRUD</h1>
    <p>Complete step-by-step guide — from scratch to production-ready</p>
    <div class="stack-badges">
      <span class="badge">Laravel 11</span>
      <span class="badge">React 18 + Inertia.js</span>
      <span class="badge">Breeze Auth</span>
      <span class="badge">Yajra DataTables</span>
      <span class="badge">Tailwind CSS</span>
      <span class="badge">MySQL</span>
    </div>
  </div>

  <div class="container">

    <div class="toc">
      <h2>📋 Table of Contents</h2>
      <ol>
        <li><a href="#step1">Install Laravel & Configure DB</a></li>
        <li><a href="#step2">Install Breeze (React + Inertia)</a></li>
        <li><a href="#step3">Install Yajra DataTables</a></li>
        <li><a href="#step4">Migrations — Department, Manager, Employee</a></li>
        <li><a href="#step5">Models & Relationships</a></li>
        <li><a href="#step6">Controllers (API + Web)</a></li>
        <li><a href="#step7">Routes</a></li>
        <li><a href="#step8">React Layout — Sidebar</a></li>
        <li><a href="#step9">Department CRUD (React)</a></li>
        <li><a href="#step10">Manager CRUD (React)</a></li>
        <li><a href="#step11">Employee CRUD — List + Filters + Yajra</a></li>
        <li><a href="#step12">Employee Add/Edit Form</a></li>
        <li><a href="#step13">Employee View Page</a></li>
        <li><a href="#step14">Delete (Soft Delete) with Confirmation</a></li>
        <li><a href="#step15">Final Polish & Run</a></li>
      </ol>
    </div>

    <!-- STEP 1 -->
    <div class="step" id="step1">
      <div class="step-header">
        <div class="step-num">1</div>
        <div>
          <div class="step-title">Install Laravel & Configure Database</div>
          <div class="step-sub">Fresh Laravel 11 project setup</div>
        </div>
      </div>

      <h3>1.1 — Create Laravel Project</h3>
      <pre><code><span class="kw">composer</span> create-project laravel/laravel employee-app
<span class="kw">cd</span> employee-app
<div class="label">bash</div></code></pre>

      <h3>1.2 — Configure .env</h3>
      <pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_db
DB_USERNAME=root
DB_PASSWORD=your_password
<div class="label">.env</div></code></pre>

      <h3>1.3 — Create Database</h3>
      <pre><code><span class="cm"># In MySQL</span>
CREATE DATABASE employee_db;
<div class="label">SQL</div></code></pre>
    </div>

    <!-- STEP 2 -->
    <div class="step" id="step2">
      <div class="step-header">
        <div class="step-num green">2</div>
        <div>
          <div class="step-title">Install Laravel Breeze (React + Inertia)</div>
          <div class="step-sub">Authentication scaffolding with React frontend</div>
        </div>
      </div>

      <pre><code><span class="kw">composer</span> require laravel/breeze --dev
<span class="kw">php</span> artisan breeze:install react
<span class="kw">npm</span> install
<span class="kw">npm</span> run dev
<span class="kw">php</span> artisan migrate
<div class="label">bash</div></code></pre>

      <div class="info-box"><strong>Note:</strong> This installs Inertia.js, React 18, Tailwind CSS, and all auth pages
        (Login, Register, Dashboard) automatically.</div>

      <h3>2.1 — Install additional packages</h3>
      <pre><code><span class="kw">npm</span> install @headlessui/react lucide-react react-datepicker date-fns
<span class="kw">npm</span> install -D @types/react-datepicker
<div class="label">bash</div></code></pre>
    </div>

    <!-- STEP 3 -->
    <div class="step" id="step3">
      <div class="step-header">
        <div class="step-num purple">3</div>
        <div>
          <div class="step-title">Install Yajra DataTables</div>
          <div class="step-sub">Server-side pagination, search, sort</div>
        </div>
      </div>

      <pre><code><span class="kw">composer</span> require yajra/laravel-datatables-oracle
<span class="kw">php</span> artisan vendor:publish --provider="Yajra\DataTables\DataTablesServiceProvider"
<div class="label">bash</div></code></pre>
    </div>

    <!-- STEP 4 -->
    <div class="step" id="step4">
      <div class="step-header">
        <div class="step-num orange">4</div>
        <div>
          <div class="step-title">Migrations</div>
          <div class="step-sub">Department → Manager → Employee (with soft deletes)</div>
        </div>
      </div>

      <h3>4.1 — Create Migrations</h3>
      <pre><code><span class="kw">php</span> artisan make:migration create_departments_table
<span class="kw">php</span> artisan make:migration create_managers_table
<span class="kw">php</span> artisan make:migration create_employees_table
<div class="label">bash</div></code></pre>

      <h4>database/migrations/create_departments_table.php</h4>
      <pre><code><span class="kw">public function</span> <span class="fn">up</span>(): void
{
    Schema::<span class="fn">create</span>(<span class="str">'departments'</span>, function (Blueprint $table) {
        $table-><span class="fn">id</span>();
        $table-><span class="fn">string</span>(<span class="str">'name'</span>)-><span class="fn">unique</span>();
        $table-><span class="fn">timestamps</span>();
        $table-><span class="fn">softDeletes</span>();
    });
}
<div class="label">PHP</div></code></pre>

      <h4>database/migrations/create_managers_table.php</h4>
      <pre><code><span class="kw">public function</span> <span class="fn">up</span>(): void
{
    Schema::<span class="fn">create</span>(<span class="str">'managers'</span>, function (Blueprint $table) {
        $table-><span class="fn">id</span>();
        $table-><span class="fn">string</span>(<span class="str">'name'</span>);
        $table-><span class="fn">foreignId</span>(<span class="str">'department_id'</span>)-><span class="fn">constrained</span>()-><span class="fn">onDelete</span>(<span class="str">'cascade'</span>);
        $table-><span class="fn">timestamps</span>();
        $table-><span class="fn">softDeletes</span>();
    });
}
<div class="label">PHP</div></code></pre>

      <h4>database/migrations/create_employees_table.php</h4>
      <pre><code><span class="kw">public function</span> <span class="fn">up</span>(): void
{
    Schema::<span class="fn">create</span>(<span class="str">'employees'</span>, function (Blueprint $table) {
        $table-><span class="fn">id</span>();
        $table-><span class="fn">string</span>(<span class="str">'full_name'</span>);
        $table-><span class="fn">string</span>(<span class="str">'employee_code'</span>)-><span class="fn">unique</span>();
        $table-><span class="fn">foreignId</span>(<span class="str">'department_id'</span>)-><span class="fn">constrained</span>()-><span class="fn">onDelete</span>(<span class="str">'cascade'</span>);
        $table-><span class="fn">foreignId</span>(<span class="str">'manager_id'</span>)-><span class="fn">nullable</span>()-><span class="fn">constrained</span>()-><span class="fn">onDelete</span>(<span class="str">'set null'</span>);
        $table-><span class="fn">date</span>(<span class="str">'joining_date'</span>);
        $table-><span class="fn">string</span>(<span class="str">'email'</span>)-><span class="fn">unique</span>();
        $table-><span class="fn">string</span>(<span class="str">'phone'</span>)-><span class="fn">nullable</span>();
        $table-><span class="fn">timestamps</span>();
        $table-><span class="fn">softDeletes</span>(); <span class="cm">// soft delete column</span>
    });
}
<div class="label">PHP</div></code></pre>

      <h3>4.2 — Run Migrations</h3>
      <pre><code><span class="kw">php</span> artisan migrate
<div class="label">bash</div></code></pre>
    </div>

    <!-- STEP 5 -->
    <div class="step" id="step5">
      <div class="step-header">
        <div class="step-num">5</div>
        <div>
          <div class="step-title">Models & Relationships</div>
          <div class="step-sub">Eloquent models with SoftDeletes</div>
        </div>
      </div>

      <pre><code><span class="kw">php</span> artisan make:model Department
<span class="kw">php</span> artisan make:model Manager
<span class="kw">php</span> artisan make:model Employee
<div class="label">bash</div></code></pre>

      <h4>app/Models/Department.php</h4>
      <pre><code><span class="kw">namespace</span> App\Models;
<span class="kw">use</span> Illuminate\Database\Eloquent\Model;
<span class="kw">use</span> Illuminate\Database\Eloquent\SoftDeletes;

<span class="kw">class</span> <span class="cls">Department</span> <span class="kw">extends</span> <span class="cls">Model</span>
{
    <span class="kw">use</span> SoftDeletes;
    <span class="kw">protected</span> $fillable = [<span class="str">'name'</span>];

    <span class="kw">public function</span> <span class="fn">employees</span>() {
        <span class="kw">return</span> $this-><span class="fn">hasMany</span>(Employee::class);
    }
    <span class="kw">public function</span> <span class="fn">managers</span>() {
        <span class="kw">return</span> $this-><span class="fn">hasMany</span>(Manager::class);
    }
}
<div class="label">PHP</div></code></pre>

      <h4>app/Models/Manager.php</h4>
      <pre><code><span class="kw">class</span> <span class="cls">Manager</span> <span class="kw">extends</span> <span class="cls">Model</span>
{
    <span class="kw">use</span> SoftDeletes;
    <span class="kw">protected</span> $fillable = [<span class="str">'name'</span>, <span class="str">'department_id'</span>];

    <span class="kw">public function</span> <span class="fn">department</span>() {
        <span class="kw">return</span> $this-><span class="fn">belongsTo</span>(Department::class);
    }
    <span class="kw">public function</span> <span class="fn">employees</span>() {
        <span class="kw">return</span> $this-><span class="fn">hasMany</span>(Employee::class);
    }
}
<div class="label">PHP</div></code></pre>

      <h4>app/Models/Employee.php</h4>
      <pre><code><span class="kw">class</span> <span class="cls">Employee</span> <span class="kw">extends</span> <span class="cls">Model</span>
{
    <span class="kw">use</span> SoftDeletes;
    <span class="kw">protected</span> $fillable = [
        <span class="str">'full_name'</span>, <span class="str">'employee_code'</span>, <span class="str">'department_id'</span>,
        <span class="str">'manager_id'</span>, <span class="str">'joining_date'</span>, <span class="str">'email'</span>, <span class="str">'phone'</span>
    ];
    <span class="kw">protected</span> $casts = [
        <span class="str">'joining_date'</span> => <span class="str">'date'</span>,
    ];

    <span class="kw">public function</span> <span class="fn">department</span>() {
        <span class="kw">return</span> $this-><span class="fn">belongsTo</span>(Department::class);
    }
    <span class="kw">public function</span> <span class="fn">manager</span>() {
        <span class="kw">return</span> $this-><span class="fn">belongsTo</span>(Manager::class);
    }
}
<div class="label">PHP</div></code></pre>
    </div>

    <!-- STEP 6 -->
    <div class="step" id="step6">
      <div class="step-header">
        <div class="step-num green">6</div>
        <div>
          <div class="step-title">Controllers</div>
          <div class="step-sub">Department, Manager, Employee with Yajra</div>
        </div>
      </div>

      <pre><code><span class="kw">php</span> artisan make:controller DepartmentController --resource
<span class="kw">php</span> artisan make:controller ManagerController --resource
<span class="kw">php</span> artisan make:controller EmployeeController --resource
<div class="label">bash</div></code></pre>

      <h4>app/Http/Controllers/DepartmentController.php</h4>
      <pre><code><span class="kw">namespace</span> App\Http\Controllers;

<span class="kw">use</span> App\Models\Department;
<span class="kw">use</span> Illuminate\Http\Request;
<span class="kw">use</span> Inertia\Inertia;

<span class="kw">class</span> <span class="cls">DepartmentController</span> <span class="kw">extends</span> <span class="cls">Controller</span>
{
    <span class="kw">public function</span> <span class="fn">index</span>() {
        $departments = Department::latest()-><span class="fn">get</span>();
        <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Departments/Index'</span>, <span class="fn">compact</span>(<span class="str">'departments'</span>));
    }

    <span class="kw">public function</span> <span class="fn">store</span>(Request $request) {
        $request-><span class="fn">validate</span>([<span class="str">'name'</span> => <span class="str">'required|unique:departments,name|max:100'</span>]);
        Department::<span class="fn">create</span>($request-><span class="fn">only</span>(<span class="str">'name'</span>));
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Department created.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">update</span>(Request $request, Department $department) {
        $request-><span class="fn">validate</span>([<span class="str">'name'</span> => <span class="str">'required|unique:departments,name,'</span>.$department->id.<span class="str">'|max:100'</span>]);
        $department-><span class="fn">update</span>($request-><span class="fn">only</span>(<span class="str">'name'</span>));
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Department updated.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">destroy</span>(Department $department) {
        $department-><span class="fn">delete</span>(); <span class="cm">// soft delete</span>
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Department deleted.'</span>);
    }
}
<div class="label">PHP</div></code></pre>

      <h4>app/Http/Controllers/ManagerController.php</h4>
      <pre><code><span class="kw">use</span> App\Models\{Manager, Department};
<span class="kw">use</span> Inertia\Inertia;

<span class="kw">class</span> <span class="cls">ManagerController</span> <span class="kw">extends</span> <span class="cls">Controller</span>
{
    <span class="kw">public function</span> <span class="fn">index</span>() {
        $managers    = Manager::<span class="fn">with</span>(<span class="str">'department'</span>)->latest()-><span class="fn">get</span>();
        $departments = Department::latest()-><span class="fn">get</span>();
        <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Managers/Index'</span>, <span class="fn">compact</span>(<span class="str">'managers'</span>, <span class="str">'departments'</span>));
    }

    <span class="kw">public function</span> <span class="fn">store</span>(Request $request) {
        $request-><span class="fn">validate</span>([
            <span class="str">'name'</span>          => <span class="str">'required|max:100'</span>,
            <span class="str">'department_id'</span> => <span class="str">'required|exists:departments,id'</span>,
        ]);
        Manager::<span class="fn">create</span>($request-><span class="fn">only</span>(<span class="str">'name'</span>, <span class="str">'department_id'</span>));
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Manager created.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">update</span>(Request $request, Manager $manager) {
        $request-><span class="fn">validate</span>([
            <span class="str">'name'</span>          => <span class="str">'required|max:100'</span>,
            <span class="str">'department_id'</span> => <span class="str">'required|exists:departments,id'</span>,
        ]);
        $manager-><span class="fn">update</span>($request-><span class="fn">only</span>(<span class="str">'name'</span>, <span class="str">'department_id'</span>));
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Manager updated.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">destroy</span>(Manager $manager) {
        $manager-><span class="fn">delete</span>();
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Manager deleted.'</span>);
    }
}
<div class="label">PHP</div></code></pre>

      <h4>app/Http/Controllers/EmployeeController.php — FULL</h4>
      <pre><code><span class="kw">namespace</span> App\Http\Controllers;

<span class="kw">use</span> App\Models\{Employee, Department, Manager};
<span class="kw">use</span> Illuminate\Http\Request;
<span class="kw">use</span> Inertia\Inertia;
<span class="kw">use</span> Yajra\DataTables\Facades\DataTables;

<span class="kw">class</span> <span class="cls">EmployeeController</span> <span class="kw">extends</span> <span class="cls">Controller</span>
{
    <span class="kw">public function</span> <span class="fn">index</span>(Request $request)
    {
        $departments = Department::latest()-><span class="fn">get</span>();
        $managers    = Manager::<span class="fn">with</span>(<span class="str">'department'</span>)->latest()-><span class="fn">get</span>();

        <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Employees/Index'</span>, [
            <span class="str">'departments'</span> => $departments,
            <span class="str">'managers'</span>    => $managers,
        ]);
    }

    <span class="cm">// Yajra DataTables AJAX endpoint</span>
    <span class="kw">public function</span> <span class="fn">datatable</span>(Request $request)
    {
        $query = Employee::<span class="fn">with</span>([<span class="str">'department'</span>, <span class="str">'manager'</span>])-><span class="fn">select</span>(<span class="str">'employees.*'</span>);

        <span class="cm">// Filters</span>
        <span class="kw">if</span> ($request-><span class="fn">filled</span>(<span class="str">'name'</span>))
            $query-><span class="fn">where</span>(<span class="str">'full_name'</span>, <span class="str">'like'</span>, <span class="str">'%'</span>.$request->name.<span class="str">'%'</span>);

        <span class="kw">if</span> ($request-><span class="fn">filled</span>(<span class="str">'department_id'</span>))
            $query-><span class="fn">where</span>(<span class="str">'department_id'</span>, $request->department_id);

        <span class="kw">if</span> ($request-><span class="fn">filled</span>(<span class="str">'manager_id'</span>))
            $query-><span class="fn">where</span>(<span class="str">'manager_id'</span>, $request->manager_id);

        <span class="kw">if</span> ($request-><span class="fn">filled</span>(<span class="str">'date_from'</span>))
            $query-><span class="fn">whereDate</span>(<span class="str">'joining_date'</span>, <span class="str">'>='</span>, $request->date_from);

        <span class="kw">if</span> ($request-><span class="fn">filled</span>(<span class="str">'date_to'</span>))
            $query-><span class="fn">whereDate</span>(<span class="str">'joining_date'</span>, <span class="str">'<='</span>, $request->date_to);

        <span class="kw">return</span> DataTables::<span class="fn">of</span>($query)
            -><span class="fn">addColumn</span>(<span class="str">'department_name'</span>, fn($e) => $e->department?->name)
            -><span class="fn">addColumn</span>(<span class="str">'manager_name'</span>,    fn($e) => $e->manager?->name)
            -><span class="fn">addColumn</span>(<span class="str">'joining_date_fmt'</span>, fn($e) => $e->joining_date?-><span class="fn">format</span>(<span class="str">'m/d/Y'</span>))
            -><span class="fn">make</span>(true);
    }

    <span class="kw">public function</span> <span class="fn">store</span>(Request $request)
    {
        $validated = $request-><span class="fn">validate</span>([
            <span class="str">'full_name'</span>     => <span class="str">'required|max:150'</span>,
            <span class="str">'employee_code'</span> => <span class="str">'required|unique:employees|max:20'</span>,
            <span class="str">'department_id'</span> => <span class="str">'required|exists:departments,id'</span>,
            <span class="str">'manager_id'</span>    => <span class="str">'nullable|exists:managers,id'</span>,
            <span class="str">'joining_date'</span>  => <span class="str">'required|date'</span>,
            <span class="str">'email'</span>         => <span class="str">'required|email|unique:employees'</span>,
            <span class="str">'phone'</span>         => <span class="str">'nullable|max:20'</span>,
        ]);
        Employee::<span class="fn">create</span>($validated);
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Employee created.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">show</span>(Employee $employee)
    {
        $employee-><span class="fn">load</span>(<span class="str">'department'</span>, <span class="str">'manager'</span>);
        <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Employees/Show'</span>, [<span class="str">'employee'</span> => $employee]);
    }

    <span class="kw">public function</span> <span class="fn">edit</span>(Employee $employee)
    {
        $employee-><span class="fn">load</span>(<span class="str">'department'</span>, <span class="str">'manager'</span>);
        $departments = Department::latest()-><span class="fn">get</span>();
        $managers    = Manager::<span class="fn">with</span>(<span class="str">'department'</span>)->latest()-><span class="fn">get</span>();
        <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Employees/Edit'</span>, <span class="fn">compact</span>(<span class="str">'employee'</span>, <span class="str">'departments'</span>, <span class="str">'managers'</span>));
    }

    <span class="kw">public function</span> <span class="fn">update</span>(Request $request, Employee $employee)
    {
        $validated = $request-><span class="fn">validate</span>([
            <span class="str">'full_name'</span>     => <span class="str">'required|max:150'</span>,
            <span class="str">'employee_code'</span> => <span class="str">'required|max:20|unique:employees,employee_code,'</span>.$employee->id,
            <span class="str">'department_id'</span> => <span class="str">'required|exists:departments,id'</span>,
            <span class="str">'manager_id'</span>    => <span class="str">'nullable|exists:managers,id'</span>,
            <span class="str">'joining_date'</span>  => <span class="str">'required|date'</span>,
            <span class="str">'email'</span>         => <span class="str">'required|email|unique:employees,email,'</span>.$employee->id,
            <span class="str">'phone'</span>         => <span class="str">'nullable|max:20'</span>,
        ]);
        $employee-><span class="fn">update</span>($validated);
        <span class="kw">return</span> <span class="fn">redirect</span>()-><span class="fn">route</span>(<span class="str">'employees.index'</span>)-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Employee updated.'</span>);
    }

    <span class="kw">public function</span> <span class="fn">destroy</span>(Employee $employee)
    {
        $employee-><span class="fn">delete</span>(); <span class="cm">// soft delete</span>
        <span class="kw">return</span> <span class="fn">back</span>()-><span class="fn">with</span>(<span class="str">'success'</span>, <span class="str">'Employee deleted.'</span>);
    }
}
<div class="label">PHP</div></code></pre>
    </div>

    <!-- STEP 7 -->
    <div class="step" id="step7">
      <div class="step-header">
        <div class="step-num purple">7</div>
        <div>
          <div class="step-title">Routes</div>
          <div class="step-sub">web.php — all protected by auth middleware</div>
        </div>
      </div>

      <h4>routes/web.php</h4>
      <pre><code><span class="kw">use</span> App\Http\Controllers\{DepartmentController, ManagerController, EmployeeController};

Route::<span class="fn">middleware</span>(<span class="str">'auth'</span>)-><span class="fn">group</span>(function () {

    <span class="cm">// Departments</span>
    Route::<span class="fn">resource</span>(<span class="str">'departments'</span>, DepartmentController::class)
          -><span class="fn">except</span>([<span class="str">'show'</span>, <span class="str">'create'</span>, <span class="str">'edit'</span>]);

    <span class="cm">// Managers</span>
    Route::<span class="fn">resource</span>(<span class="str">'managers'</span>, ManagerController::class)
          -><span class="fn">except</span>([<span class="str">'show'</span>, <span class="str">'create'</span>, <span class="str">'edit'</span>]);

    <span class="cm">// Employees</span>
    Route::<span class="fn">resource</span>(<span class="str">'employees'</span>, EmployeeController::class);
    Route::<span class="fn">get</span>(<span class="str">'/employees-datatable'</span>, [EmployeeController::class, <span class="str">'datatable'</span>])
          -><span class="fn">name</span>(<span class="str">'employees.datatable'</span>);

});
<div class="label">PHP</div></code></pre>
    </div>

    <!-- STEP 8 -->
    <div class="step" id="step8">
      <div class="step-header">
        <div class="step-num orange">8</div>
        <div>
          <div class="step-title">React Layout — Sidebar</div>
          <div class="step-sub">resources/js/Layouts/AppLayout.jsx</div>
        </div>
      </div>

      <pre><code><span class="kw">import</span> { Link, usePage } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> { Building2, Users, UserCog, LayoutDashboard } from <span class="str">'lucide-react'</span>;

<span class="kw">const</span> navLinks = [
  { href: <span class="str">'/dashboard'</span>,   label: <span class="str">'Dashboard'</span>,   icon: LayoutDashboard },
  { href: <span class="str">'/departments'</span>, label: <span class="str">'Departments'</span>, icon: Building2 },
  { href: <span class="str">'/managers'</span>,    label: <span class="str">'Managers'</span>,    icon: UserCog },
  { href: <span class="str">'/employees'</span>,   label: <span class="str">'Employees'</span>,   icon: Users },
];

<span class="kw">export default function</span> <span class="fn">AppLayout</span>({ children }) {
  <span class="kw">const</span> { url } = <span class="fn">usePage</span>();

  <span class="kw">return</span> (
    &lt;div className=<span class="str">"flex h-screen bg-gray-100"</span>&gt;
      {<span class="cm">/* Sidebar */</span>}
      &lt;aside className=<span class="str">"w-64 bg-white border-r border-gray-200 flex flex-col"</span>&gt;
        &lt;div className=<span class="str">"px-6 py-5 border-b border-gray-200"</span>&gt;
          &lt;h1 className=<span class="str">"text-xl font-bold text-blue-600"</span>&gt;EmpManager&lt;/h1&gt;
        &lt;/div&gt;
        &lt;nav className=<span class="str">"flex-1 py-4 px-3 space-y-1"</span>&gt;
          {navLinks.<span class="fn">map</span>(({ href, label, icon: Icon }) =&gt; (
            &lt;Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${url.<span class="fn">startsWith</span>(href)
                  ? <span class="str">'bg-blue-50 text-blue-700'</span>
                  : <span class="str">'text-gray-600 hover:bg-gray-50 hover:text-gray-900'</span>}`}
            &gt;
              &lt;Icon size={18} /&gt;
              {label}
            &lt;/Link&gt;
          ))}
        &lt;/nav&gt;
      &lt;/aside&gt;

      {<span class="cm">/* Main */</span>}
      &lt;div className=<span class="str">"flex-1 flex flex-col overflow-hidden"</span>&gt;
        &lt;header className=<span class="str">"bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center"</span>&gt;
          &lt;h2 className=<span class="str">"text-lg font-semibold text-gray-800"</span>&gt;Employee Management&lt;/h2&gt;
          &lt;Link href=<span class="str">"/logout"</span> method=<span class="str">"post"</span> className=<span class="str">"text-sm text-red-500 hover:text-red-700"</span>&gt;Logout&lt;/Link&gt;
        &lt;/header&gt;
        &lt;main className=<span class="str">"flex-1 overflow-y-auto p-8"</span>&gt;
          {children}
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
<div class="label">JSX</div></code></pre>
    </div>

    <!-- STEP 9 -->
    <div class="step" id="step9">
      <div class="step-header">
        <div class="step-num">9</div>
        <div>
          <div class="step-title">Department CRUD Page</div>
          <div class="step-sub">resources/js/Pages/Departments/Index.jsx</div>
        </div>
      </div>

      <pre><code><span class="kw">import</span> { useState } from <span class="str">'react'</span>;
<span class="kw">import</span> { useForm } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> AppLayout from <span class="str">'@/Layouts/AppLayout'</span>;
<span class="kw">import</span> { Pencil, Trash2, Plus, X } from <span class="str">'lucide-react'</span>;

<span class="kw">export default function</span> <span class="fn">DepartmentsIndex</span>({ departments }) {
  <span class="kw">const</span> [editing, setEditing] = <span class="fn">useState</span>(null);
  <span class="kw">const</span> [showForm, setShowForm] = <span class="fn">useState</span>(false);
  <span class="kw">const</span> [deleteId, setDeleteId] = <span class="fn">useState</span>(null);

  <span class="kw">const</span> { data, setData, post, put, errors, reset, processing } = <span class="fn">useForm</span>({ name: <span class="str">''</span> });

  <span class="kw">const</span> <span class="fn">openAdd</span> = () => { setEditing(null); <span class="fn">reset</span>(); <span class="fn">setShowForm</span>(true); };
  <span class="kw">const</span> <span class="fn">openEdit</span> = (dept) => { setEditing(dept); <span class="fn">setData</span>(<span class="str">'name'</span>, dept.name); <span class="fn">setShowForm</span>(true); };
  <span class="kw">const</span> <span class="fn">closeForm</span> = () => { <span class="fn">setShowForm</span>(false); <span class="fn">setEditing</span>(null); <span class="fn">reset</span>(); };

  <span class="kw">const</span> <span class="fn">submit</span> = (e) => {
    e.<span class="fn">preventDefault</span>();
    <span class="kw">if</span> (editing) {
      <span class="fn">put</span>(route(<span class="str">'departments.update'</span>, editing.id), { onSuccess: closeForm });
    } <span class="kw">else</span> {
      <span class="fn">post</span>(route(<span class="str">'departments.store'</span>), { onSuccess: closeForm });
    }
  };

  <span class="kw">const</span> { delete: destroy } = <span class="fn">useForm</span>();
  <span class="kw">const</span> <span class="fn">confirmDelete</span> = () => {
    <span class="fn">destroy</span>(route(<span class="str">'departments.destroy'</span>, deleteId), { onSuccess: () => <span class="fn">setDeleteId</span>(null) });
  };

  <span class="kw">return</span> (
    &lt;AppLayout&gt;
      &lt;div className=<span class="str">"flex justify-between items-center mb-6"</span>&gt;
        &lt;h1 className=<span class="str">"text-2xl font-bold text-gray-800"</span>&gt;Departments&lt;/h1&gt;
        &lt;button onClick={openAdd} className=<span class="str">"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"</span>&gt;
          &lt;Plus size={16} /&gt; Add Department
        &lt;/button&gt;
      &lt;/div&gt;

      {<span class="cm">/* Table */</span>}
      &lt;div className=<span class="str">"bg-white rounded-xl border border-gray-200 overflow-hidden"</span>&gt;
        &lt;table className=<span class="str">"w-full text-sm"</span>&gt;
          &lt;thead className=<span class="str">"bg-gray-50 text-gray-500 uppercase text-xs"</span>&gt;
            &lt;tr&gt;
              &lt;th className=<span class="str">"px-6 py-3 text-left"</span>&gt;Name&lt;/th&gt;
              &lt;th className=<span class="str">"px-6 py-3 text-right"</span>&gt;Actions&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className=<span class="str">"divide-y divide-gray-100"</span>&gt;
            {departments.<span class="fn">map</span>((dept) =&gt; (
              &lt;tr key={dept.id} className=<span class="str">"hover:bg-gray-50"</span>&gt;
                &lt;td className=<span class="str">"px-6 py-4 font-medium text-gray-800"</span>&gt;{dept.name}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-right space-x-2"</span>&gt;
                  &lt;button onClick={() =&gt; openEdit(dept)} className=<span class="str">"text-blue-600 hover:text-blue-800"</span>&gt;&lt;Pencil size={15}/&gt;&lt;/button&gt;
                  &lt;button onClick={() =&gt; setDeleteId(dept.id)} className=<span class="str">"text-red-500 hover:text-red-700"</span>&gt;&lt;Trash2 size={15}/&gt;&lt;/button&gt;
                &lt;/td&gt;
              &lt;/tr&gt;
            ))}
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;

      {<span class="cm">/* Add/Edit Drawer */</span>}
      {showForm &amp;&amp; (
        &lt;div className=<span class="str">"fixed inset-0 bg-black/30 flex items-center justify-center z-50"</span>&gt;
          &lt;div className=<span class="str">"bg-white rounded-2xl shadow-2xl w-96 p-6"</span>&gt;
            &lt;div className=<span class="str">"flex justify-between items-center mb-5"</span>&gt;
              &lt;h2 className=<span class="str">"text-lg font-bold"</span>&gt;{editing ? <span class="str">'Edit Department'</span> : <span class="str">'Add Department'</span>}&lt;/h2&gt;
              &lt;button onClick={closeForm}&gt;&lt;X size={18} className=<span class="str">"text-gray-500"</span>/&gt;&lt;/button&gt;
            &lt;/div&gt;
            &lt;form onSubmit={submit}&gt;
              &lt;label className=<span class="str">"block text-sm font-medium text-gray-700 mb-1"</span>&gt;Department Name&lt;/label&gt;
              &lt;input
                value={data.name}
                onChange={e =&gt; setData(<span class="str">'name'</span>, e.target.value)}
                className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"</span>
                placeholder=<span class="str">"e.g. Sales"</span>
              /&gt;
              {errors.name &amp;&amp; &lt;p className=<span class="str">"text-red-500 text-xs mt-1"</span>&gt;{errors.name}&lt;/p&gt;}
              &lt;div className=<span class="str">"flex gap-3 mt-5"</span>&gt;
                &lt;button type=<span class="str">"button"</span> onClick={closeForm} className=<span class="str">"flex-1 border border-gray-300 rounded-lg py-2 text-sm"</span>&gt;Cancel&lt;/button&gt;
                &lt;button type=<span class="str">"submit"</span> disabled={processing} className=<span class="str">"flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700"</span>&gt;Save&lt;/button&gt;
              &lt;/div&gt;
            &lt;/form&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}

      {<span class="cm">/* Delete Confirmation */</span>}
      {deleteId &amp;&amp; (
        &lt;div className=<span class="str">"fixed inset-0 bg-black/30 flex items-center justify-center z-50"</span>&gt;
          &lt;div className=<span class="str">"bg-white rounded-2xl shadow-2xl p-6 w-80 text-center"</span>&gt;
            &lt;p className=<span class="str">"text-gray-700 font-medium mb-4"</span>&gt;Are you sure you want to delete this department?&lt;/p&gt;
            &lt;div className=<span class="str">"flex gap-3"</span>&gt;
              &lt;button onClick={() =&gt; setDeleteId(null)} className=<span class="str">"flex-1 border rounded-lg py-2 text-sm"</span>&gt;Cancel&lt;/button&gt;
              &lt;button onClick={confirmDelete} className=<span class="str">"flex-1 bg-red-500 text-white rounded-lg py-2 text-sm"</span>&gt;Yes, Delete&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/AppLayout&gt;
  );
}
<div class="label">JSX</div></code></pre>
    </div>

    <!-- STEP 10 -->
    <div class="step" id="step10">
      <div class="step-header">
        <div class="step-num green">10</div>
        <div>
          <div class="step-title">Manager CRUD Page</div>
          <div class="step-sub">resources/js/Pages/Managers/Index.jsx</div>
        </div>
      </div>

      <p>Very similar to Departments. Key differences: has a Department dropdown.</p>
      <pre><code><span class="kw">import</span> { useState } from <span class="str">'react'</span>;
<span class="kw">import</span> { useForm } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> AppLayout from <span class="str">'@/Layouts/AppLayout'</span>;
<span class="kw">import</span> { Pencil, Trash2, Plus, X } from <span class="str">'lucide-react'</span>;

<span class="kw">export default function</span> <span class="fn">ManagersIndex</span>({ managers, departments }) {
  <span class="kw">const</span> [editing, setEditing] = <span class="fn">useState</span>(null);
  <span class="kw">const</span> [showForm, setShowForm] = <span class="fn">useState</span>(false);
  <span class="kw">const</span> [deleteId, setDeleteId] = <span class="fn">useState</span>(null);

  <span class="kw">const</span> { data, setData, post, put, errors, reset, processing } = <span class="fn">useForm</span>({
    name: <span class="str">''</span>, department_id: <span class="str">''</span>
  });

  <span class="kw">const</span> <span class="fn">openAdd</span>  = () => { <span class="fn">setEditing</span>(null); <span class="fn">reset</span>(); <span class="fn">setShowForm</span>(true); };
  <span class="kw">const</span> <span class="fn">openEdit</span> = (m) => {
    <span class="fn">setEditing</span>(m);
    <span class="fn">setData</span>({ name: m.name, department_id: m.department_id });
    <span class="fn">setShowForm</span>(true);
  };
  <span class="kw">const</span> <span class="fn">closeForm</span> = () => { <span class="fn">setShowForm</span>(false); <span class="fn">setEditing</span>(null); <span class="fn">reset</span>(); };

  <span class="kw">const</span> <span class="fn">submit</span> = (e) => {
    e.<span class="fn">preventDefault</span>();
    editing
      ? <span class="fn">put</span>(route(<span class="str">'managers.update'</span>, editing.id), { onSuccess: closeForm })
      : <span class="fn">post</span>(route(<span class="str">'managers.store'</span>), { onSuccess: closeForm });
  };

  <span class="kw">const</span> { delete: destroy } = <span class="fn">useForm</span>();
  <span class="kw">const</span> <span class="fn">doDelete</span> = () =>
    <span class="fn">destroy</span>(route(<span class="str">'managers.destroy'</span>, deleteId), { onSuccess: () => <span class="fn">setDeleteId</span>(null) });

  <span class="kw">return</span> (
    &lt;AppLayout&gt;
      &lt;div className=<span class="str">"flex justify-between items-center mb-6"</span>&gt;
        &lt;h1 className=<span class="str">"text-2xl font-bold text-gray-800"</span>&gt;Managers&lt;/h1&gt;
        &lt;button onClick={openAdd} className=<span class="str">"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"</span>&gt;
          &lt;Plus size={16}/&gt; Add Manager
        &lt;/button&gt;
      &lt;/div&gt;

      &lt;div className=<span class="str">"bg-white rounded-xl border border-gray-200 overflow-hidden"</span>&gt;
        &lt;table className=<span class="str">"w-full text-sm"</span>&gt;
          &lt;thead className=<span class="str">"bg-gray-50 text-gray-500 uppercase text-xs"</span>&gt;
            &lt;tr&gt;
              &lt;th className=<span class="str">"px-6 py-3 text-left"</span>&gt;Name&lt;/th&gt;
              &lt;th className=<span class="str">"px-6 py-3 text-left"</span>&gt;Department&lt;/th&gt;
              &lt;th className=<span class="str">"px-6 py-3 text-right"</span>&gt;Actions&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className=<span class="str">"divide-y divide-gray-100"</span>&gt;
            {managers.<span class="fn">map</span>((m) =&gt; (
              &lt;tr key={m.id} className=<span class="str">"hover:bg-gray-50"</span>&gt;
                &lt;td className=<span class="str">"px-6 py-4 font-medium text-gray-800"</span>&gt;{m.name}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-gray-500"</span>&gt;{m.department?.name}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-right space-x-2"</span>&gt;
                  &lt;button onClick={() =&gt; openEdit(m)} className=<span class="str">"text-blue-600"</span>&gt;&lt;Pencil size={15}/&gt;&lt;/button&gt;
                  &lt;button onClick={() =&gt; setDeleteId(m.id)} className=<span class="str">"text-red-500"</span>&gt;&lt;Trash2 size={15}/&gt;&lt;/button&gt;
                &lt;/td&gt;
              &lt;/tr&gt;
            ))}
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;

      {showForm &amp;&amp; (
        &lt;div className=<span class="str">"fixed inset-0 bg-black/30 flex items-center justify-center z-50"</span>&gt;
          &lt;div className=<span class="str">"bg-white rounded-2xl shadow-2xl w-96 p-6"</span>&gt;
            &lt;div className=<span class="str">"flex justify-between items-center mb-5"</span>&gt;
              &lt;h2 className=<span class="str">"text-lg font-bold"</span>&gt;{editing ? <span class="str">'Edit Manager'</span> : <span class="str">'Add Manager'</span>}&lt;/h2&gt;
              &lt;button onClick={closeForm}&gt;&lt;X size={18} className=<span class="str">"text-gray-500"</span>/&gt;&lt;/button&gt;
            &lt;/div&gt;
            &lt;form onSubmit={submit} className=<span class="str">"space-y-4"</span>&gt;
              &lt;div&gt;
                &lt;label className=<span class="str">"block text-sm font-medium mb-1"</span>&gt;Name&lt;/label&gt;
                &lt;input value={data.name} onChange={e =&gt; setData(<span class="str">'name'</span>, e.target.value)}
                  className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>/&gt;
                {errors.name &amp;&amp; &lt;p className=<span class="str">"text-red-500 text-xs"</span>&gt;{errors.name}&lt;/p&gt;}
              &lt;/div&gt;
              &lt;div&gt;
                &lt;label className=<span class="str">"block text-sm font-medium mb-1"</span>&gt;Department&lt;/label&gt;
                &lt;select value={data.department_id} onChange={e =&gt; setData(<span class="str">'department_id'</span>, e.target.value)}
                  className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>&gt;
                  &lt;option value=<span class="str">""</span>&gt;Select Department&lt;/option&gt;
                  {departments.<span class="fn">map</span>(d =&gt; &lt;option key={d.id} value={d.id}&gt;{d.name}&lt;/option&gt;)}
                &lt;/select&gt;
                {errors.department_id &amp;&amp; &lt;p className=<span class="str">"text-red-500 text-xs"</span>&gt;{errors.department_id}&lt;/p&gt;}
              &lt;/div&gt;
              &lt;div className=<span class="str">"flex gap-3 pt-2"</span>&gt;
                &lt;button type=<span class="str">"button"</span> onClick={closeForm} className=<span class="str">"flex-1 border border-gray-300 rounded-lg py-2 text-sm"</span>&gt;Cancel&lt;/button&gt;
                &lt;button type=<span class="str">"submit"</span> disabled={processing} className=<span class="str">"flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm"</span>&gt;Save&lt;/button&gt;
              &lt;/div&gt;
            &lt;/form&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}

      {deleteId &amp;&amp; (
        &lt;div className=<span class="str">"fixed inset-0 bg-black/30 flex items-center justify-center z-50"</span>&gt;
          &lt;div className=<span class="str">"bg-white rounded-2xl p-6 w-80 text-center"</span>&gt;
            &lt;p className=<span class="str">"text-gray-700 font-medium mb-4"</span>&gt;Are you sure you want to delete this manager?&lt;/p&gt;
            &lt;div className=<span class="str">"flex gap-3"</span>&gt;
              &lt;button onClick={() =&gt; setDeleteId(null)} className=<span class="str">"flex-1 border rounded-lg py-2 text-sm"</span>&gt;Cancel&lt;/button&gt;
              &lt;button onClick={doDelete} className=<span class="str">"flex-1 bg-red-500 text-white rounded-lg py-2 text-sm"</span>&gt;Yes, Delete&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/AppLayout&gt;
  );
}
<div class="label">JSX</div></code></pre>
    </div>

    <!-- STEP 11 -->
    <div class="step" id="step11">
      <div class="step-header">
        <div class="step-num purple">11</div>
        <div>
          <div class="step-title">Employee List — Yajra + Filters + Pagination</div>
          <div class="step-sub">resources/js/Pages/Employees/Index.jsx</div>
        </div>
      </div>

      <div class="info-box"><strong>How it works:</strong> React fetches <code>/employees-datatable</code> via axios on
        filter change. Yajra handles server-side search, filter, and pagination. Results render in a custom React table.
      </div>

      <pre><code><span class="kw">import</span> { useState, useEffect, useCallback } from <span class="str">'react'</span>;
<span class="kw">import</span> { Link, router } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> axios from <span class="str">'axios'</span>;
<span class="kw">import</span> AppLayout from <span class="str">'@/Layouts/AppLayout'</span>;
<span class="kw">import</span> { Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from <span class="str">'lucide-react'</span>;
<span class="kw">import</span> DatePicker from <span class="str">'react-datepicker'</span>;
<span class="kw">import</span> <span class="str">'react-datepicker/dist/react-datepicker.css'</span>;
<span class="kw">import</span> { format } from <span class="str">'date-fns'</span>;

<span class="kw">export default function</span> <span class="fn">EmployeesIndex</span>({ departments, managers }) {
  <span class="kw">const</span> [employees, setEmployees]   = <span class="fn">useState</span>([]);
  <span class="kw">const</span> [pagination, setPagination] = <span class="fn">useState</span>({ current: <span class="num">1</span>, last: <span class="num">1</span>, total: <span class="num">0</span> });
  <span class="kw">const</span> [loading, setLoading]       = <span class="fn">useState</span>(false);
  <span class="kw">const</span> [deleteId, setDeleteId]     = <span class="fn">useState</span>(null);
  <span class="kw">const</span> [showForm, setShowForm]     = <span class="fn">useState</span>(false);

  <span class="kw">const</span> [filters, setFilters] = <span class="fn">useState</span>({
    name: <span class="str">''</span>, department_id: <span class="str">''</span>, manager_id: <span class="str">''</span>,
    date_from: null, date_to: null, page: <span class="num">1</span>
  });

  <span class="kw">const</span> <span class="fn">fetchData</span> = <span class="fn">useCallback</span>(<span class="kw">async</span> (f) => {
    <span class="fn">setLoading</span>(true);
    <span class="kw">try</span> {
      <span class="kw">const</span> params = {
        ...f,
        date_from: f.date_from ? <span class="fn">format</span>(f.date_from, <span class="str">'yyyy-MM-dd'</span>) : <span class="str">''</span>,
        date_to:   f.date_to   ? <span class="fn">format</span>(f.date_to,   <span class="str">'yyyy-MM-dd'</span>) : <span class="str">''</span>,
        start: (f.page - <span class="num">1</span>) * <span class="num">10</span>,
        length: <span class="num">10</span>,
      };
      <span class="kw">const</span> res = <span class="kw">await</span> axios.<span class="fn">get</span>(<span class="str">'/employees-datatable'</span>, { params });
      <span class="fn">setEmployees</span>(res.data.data);
      <span class="fn">setPagination</span>({
        current: f.page,
        last: Math.<span class="fn">ceil</span>(res.data.recordsFiltered / <span class="num">10</span>) || <span class="num">1</span>,
        total: res.data.recordsFiltered,
      });
    } <span class="kw">finally</span> { <span class="fn">setLoading</span>(false); }
  }, []);

  <span class="fn">useEffect</span>(() => { <span class="fn">fetchData</span>(filters); }, [filters]);

  <span class="kw">const</span> <span class="fn">updateFilter</span> = (key, val) =>
    <span class="fn">setFilters</span>(prev => ({ ...prev, [key]: val, page: <span class="num">1</span> }));

  <span class="kw">const</span> <span class="fn">doDelete</span> = () => {
    router.<span class="fn">delete</span>(route(<span class="str">'employees.destroy'</span>, deleteId), {
      onSuccess: () => { <span class="fn">setDeleteId</span>(null); <span class="fn">fetchData</span>(filters); }
    });
  };

  <span class="kw">return</span> (
    &lt;AppLayout&gt;
      &lt;div className=<span class="str">"flex justify-between items-center mb-6"</span>&gt;
        &lt;h1 className=<span class="str">"text-2xl font-bold text-gray-800"</span>&gt;Employees&lt;/h1&gt;
        &lt;Link href={route(<span class="str">'employees.create'</span>)}
          className=<span class="str">"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"</span>&gt;
          &lt;Plus size={16}/&gt; Add Employee
        &lt;/Link&gt;
      &lt;/div&gt;

      {<span class="cm">/* Filters */</span>}
      &lt;div className=<span class="str">"bg-white rounded-xl border border-gray-200 p-4 mb-4 grid grid-cols-5 gap-3"</span>&gt;
        &lt;input
          placeholder=<span class="str">"Search by Name"</span>
          value={filters.name}
          onChange={e =&gt; updateFilter(<span class="str">'name'</span>, e.target.value)}
          className=<span class="str">"border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>
        /&gt;
        &lt;select value={filters.department_id} onChange={e =&gt; updateFilter(<span class="str">'department_id'</span>, e.target.value)}
          className=<span class="str">"border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>&gt;
          &lt;option value=<span class="str">""</span>&gt;All Departments&lt;/option&gt;
          {departments.<span class="fn">map</span>(d =&gt; &lt;option key={d.id} value={d.id}&gt;{d.name}&lt;/option&gt;)}
        &lt;/select&gt;
        &lt;select value={filters.manager_id} onChange={e =&gt; updateFilter(<span class="str">'manager_id'</span>, e.target.value)}
          className=<span class="str">"border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>&gt;
          &lt;option value=<span class="str">""</span>&gt;All Managers&lt;/option&gt;
          {managers.<span class="fn">map</span>(m =&gt; &lt;option key={m.id} value={m.id}&gt;{m.name}&lt;/option&gt;)}
        &lt;/select&gt;
        &lt;DatePicker selected={filters.date_from} onChange={d =&gt; updateFilter(<span class="str">'date_from'</span>, d)}
          placeholderText=<span class="str">"Joining Date From"</span> dateFormat=<span class="str">"MM/dd/yyyy"</span>
          className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>/&gt;
        &lt;DatePicker selected={filters.date_to} onChange={d =&gt; updateFilter(<span class="str">'date_to'</span>, d)}
          placeholderText=<span class="str">"To Date"</span> dateFormat=<span class="str">"MM/dd/yyyy"</span>
          className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>/&gt;
      &lt;/div&gt;

      {<span class="cm">/* Table */</span>}
      &lt;div className=<span class="str">"bg-white rounded-xl border border-gray-200 overflow-hidden"</span>&gt;
        &lt;table className=<span class="str">"w-full text-sm"</span>&gt;
          &lt;thead className=<span class="str">"bg-gray-50 text-gray-500 uppercase text-xs"</span>&gt;
            &lt;tr&gt;
              {[<span class="str">'Employee Name'</span>, <span class="str">'Code'</span>, <span class="str">'Department'</span>, <span class="str">'Manager'</span>, <span class="str">'Joined Date'</span>, <span class="str">'Actions'</span>].<span class="fn">map</span>(h =&gt;
                &lt;th key={h} className=<span class="str">`px-6 py-3 ${h === 'Actions' ? 'text-right' : 'text-left'}`</span>&gt;{h}&lt;/th&gt;
              )}
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody className=<span class="str">"divide-y divide-gray-100"</span>&gt;
            {loading ? (
              &lt;tr&gt;&lt;td colSpan=<span class="str">"6"</span> className=<span class="str">"text-center py-8 text-gray-400"</span>&gt;Loading...&lt;/td&gt;&lt;/tr&gt;
            ) : employees.<span class="fn">length</span> === <span class="num">0</span> ? (
              &lt;tr&gt;&lt;td colSpan=<span class="str">"6"</span> className=<span class="str">"text-center py-8 text-gray-400"</span>&gt;No employees found.&lt;/td&gt;&lt;/tr&gt;
            ) : employees.<span class="fn">map</span>(emp =&gt; (
              &lt;tr key={emp.id} className=<span class="str">"hover:bg-gray-50"</span>&gt;
                &lt;td className=<span class="str">"px-6 py-4"</span>&gt;
                  &lt;Link href={route(<span class="str">'employees.show'</span>, emp.id)} className=<span class="str">"text-blue-600 hover:underline font-medium"</span>&gt;
                    {emp.full_name}
                  &lt;/Link&gt;
                &lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-gray-500"</span>&gt;{emp.employee_code}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-gray-600"</span>&gt;{emp.department_name}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-gray-600"</span>&gt;{emp.manager_name}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-gray-500"</span>&gt;{emp.joining_date_fmt}&lt;/td&gt;
                &lt;td className=<span class="str">"px-6 py-4 text-right space-x-3"</span>&gt;
                  &lt;Link href={route(<span class="str">'employees.show'</span>, emp.id)} className=<span class="str">"text-gray-400 hover:text-gray-700"</span>&gt;&lt;Eye size={15}/&gt;&lt;/Link&gt;
                  &lt;Link href={route(<span class="str">'employees.edit'</span>, emp.id)} className=<span class="str">"text-blue-500 hover:text-blue-700"</span>&gt;&lt;Pencil size={15}/&gt;&lt;/Link&gt;
                  &lt;button onClick={() =&gt; setDeleteId(emp.id)} className=<span class="str">"text-red-500 hover:text-red-700"</span>&gt;&lt;Trash2 size={15}/&gt;&lt;/button&gt;
                &lt;/td&gt;
              &lt;/tr&gt;
            ))}
          &lt;/tbody&gt;
        &lt;/table&gt;

        {<span class="cm">/* Pagination */</span>}
        &lt;div className=<span class="str">"flex justify-between items-center px-6 py-4 border-t border-gray-100"</span>&gt;
          &lt;span className=<span class="str">"text-sm text-gray-500"</span>&gt;
            Page {pagination.current} of {pagination.last} — {pagination.total} records
          &lt;/span&gt;
          &lt;div className=<span class="str">"flex gap-2"</span>&gt;
            &lt;button
              disabled={pagination.current === <span class="num">1</span>}
              onClick={() =&gt; setFilters(p =&gt; ({...p, page: p.page - <span class="num">1</span>}))}
              className=<span class="str">"flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-40"</span>&gt;
              &lt;ChevronLeft size={14}/&gt; Previous
            &lt;/button&gt;
            &lt;button
              disabled={pagination.current === pagination.last}
              onClick={() =&gt; setFilters(p =&gt; ({...p, page: p.page + <span class="num">1</span>}))}
              className=<span class="str">"flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-40"</span>&gt;
              Next &lt;ChevronRight size={14}/&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {<span class="cm">/* Delete Modal */</span>}
      {deleteId &amp;&amp; (
        &lt;div className=<span class="str">"fixed inset-0 bg-black/30 flex items-center justify-center z-50"</span>&gt;
          &lt;div className=<span class="str">"bg-white rounded-2xl p-6 w-80 text-center shadow-2xl"</span>&gt;
            &lt;div className=<span class="str">"w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"</span>&gt;
              &lt;Trash2 size={20} className=<span class="str">"text-red-500"</span>/&gt;
            &lt;/div&gt;
            &lt;p className=<span class="str">"text-gray-800 font-semibold mb-1"</span>&gt;Delete Employee?&lt;/p&gt;
            &lt;p className=<span class="str">"text-gray-500 text-sm mb-4"</span>&gt;Are you sure you want to delete this employee? This action cannot be undone.&lt;/p&gt;
            &lt;div className=<span class="str">"flex gap-3"</span>&gt;
              &lt;button onClick={() =&gt; setDeleteId(null)} className=<span class="str">"flex-1 border border-gray-300 rounded-lg py-2 text-sm"</span>&gt;Cancel&lt;/button&gt;
              &lt;button onClick={doDelete} className=<span class="str">"flex-1 bg-red-500 text-white rounded-lg py-2 text-sm"</span>&gt;Yes, Delete&lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/AppLayout&gt;
  );
}
<div class="label">JSX</div></code></pre>
    </div>

    <!-- STEP 12 -->
    <div class="step" id="step12">
      <div class="step-header">
        <div class="step-num red">12</div>
        <div>
          <div class="step-title">Employee Add/Edit Form Page</div>
          <div class="step-sub">Create.jsx + Edit.jsx (shared EmployeeForm component)</div>
        </div>
      </div>

      <h4>resources/js/Pages/Employees/EmployeeForm.jsx — Reusable Form</h4>
      <pre><code><span class="kw">import</span> { useForm } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> AppLayout from <span class="str">'@/Layouts/AppLayout'</span>;
<span class="kw">import</span> { Link } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> DatePicker from <span class="str">'react-datepicker'</span>;
<span class="kw">import</span> <span class="str">'react-datepicker/dist/react-datepicker.css'</span>;

<span class="kw">export default function</span> <span class="fn">EmployeeForm</span>({ employee = null, departments, managers, isEdit = false }) {
  <span class="kw">const</span> { data, setData, post, put, errors, processing } = <span class="fn">useForm</span>({
    full_name:     employee?.full_name     ?? <span class="str">''</span>,
    employee_code: employee?.employee_code ?? <span class="str">''</span>,
    department_id: employee?.department_id ?? <span class="str">''</span>,
    manager_id:    employee?.manager_id    ?? <span class="str">''</span>,
    joining_date:  employee?.joining_date  ? <span class="kw">new</span> <span class="fn">Date</span>(employee.joining_date) : <span class="num">null</span>,
    email:         employee?.email         ?? <span class="str">''</span>,
    phone:         employee?.phone         ?? <span class="str">''</span>,
  });

  <span class="kw">const</span> <span class="fn">submit</span> = (e) => {
    e.<span class="fn">preventDefault</span>();
    <span class="kw">if</span> (isEdit) {
      <span class="fn">put</span>(route(<span class="str">'employees.update'</span>, employee.id));
    } <span class="kw">else</span> {
      <span class="fn">post</span>(route(<span class="str">'employees.store'</span>));
    }
  };

  <span class="kw">const</span> <span class="fn">Field</span> = ({ label, error, children }) =&gt; (
    &lt;div&gt;
      &lt;label className=<span class="str">"block text-sm font-medium text-gray-700 mb-1"</span>&gt;{label}&lt;/label&gt;
      {children}
      {error &amp;&amp; &lt;p className=<span class="str">"text-red-500 text-xs mt-1"</span>&gt;{error}&lt;/p&gt;}
    &lt;/div&gt;
  );

  <span class="kw">return</span> (
    &lt;AppLayout&gt;
      &lt;div className=<span class="str">"max-w-2xl"</span>&gt;
        &lt;h1 className=<span class="str">"text-2xl font-bold text-gray-800 mb-6"</span>&gt;{isEdit ? <span class="str">'Edit Employee'</span> : <span class="str">'Add Employee'</span>}&lt;/h1&gt;

        &lt;form onSubmit={submit} className=<span class="str">"bg-white rounded-xl border border-gray-200 p-8 space-y-5"</span>&gt;
          &lt;Field label=<span class="str">"Full Name"</span> error={errors.full_name}&gt;
            &lt;input value={data.full_name} onChange={e =&gt; setData(<span class="str">'full_name'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"</span>/&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Employee Code"</span> error={errors.employee_code}&gt;
            &lt;input value={data.employee_code} onChange={e =&gt; setData(<span class="str">'employee_code'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"</span>/&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Department"</span> error={errors.department_id}&gt;
            &lt;select value={data.department_id} onChange={e =&gt; setData(<span class="str">'department_id'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>&gt;
              &lt;option value=<span class="str">""</span>&gt;Select Department&lt;/option&gt;
              {departments.<span class="fn">map</span>(d =&gt; &lt;option key={d.id} value={d.id}&gt;{d.name}&lt;/option&gt;)}
            &lt;/select&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Manager"</span> error={errors.manager_id}&gt;
            &lt;select value={data.manager_id} onChange={e =&gt; setData(<span class="str">'manager_id'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>&gt;
              &lt;option value=<span class="str">""</span>&gt;Select Manager&lt;/option&gt;
              {managers.<span class="fn">map</span>(m =&gt; &lt;option key={m.id} value={m.id}&gt;{m.name}&lt;/option&gt;)}
            &lt;/select&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Joining Date"</span> error={errors.joining_date}&gt;
            &lt;DatePicker
              selected={data.joining_date}
              onChange={d =&gt; setData(<span class="str">'joining_date'</span>, d)}
              dateFormat=<span class="str">"MM/dd/yyyy"</span>
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"</span>
              placeholderText=<span class="str">"Select date"</span>
            /&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Email Address"</span> error={errors.email}&gt;
            &lt;input type=<span class="str">"email"</span> value={data.email} onChange={e =&gt; setData(<span class="str">'email'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"</span>/&gt;
          &lt;/Field&gt;

          &lt;Field label=<span class="str">"Phone Number"</span> error={errors.phone}&gt;
            &lt;input value={data.phone} onChange={e =&gt; setData(<span class="str">'phone'</span>, e.target.value)}
              className=<span class="str">"w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"</span>/&gt;
          &lt;/Field&gt;

          &lt;div className=<span class="str">"flex gap-3 pt-2"</span>&gt;
            &lt;Link href={route(<span class="str">'employees.index'</span>)}
              className=<span class="str">"flex-1 text-center border border-gray-300 rounded-lg py-2.5 text-sm font-medium"</span>&gt;
              Cancel
            &lt;/Link&gt;
            &lt;button type=<span class="str">"submit"</span> disabled={processing}
              className=<span class="str">"flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700"</span>&gt;
              {processing ? <span class="str">'Saving...'</span> : <span class="str">'Save Employee'</span>}
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/form&gt;
      &lt;/div&gt;
    &lt;/AppLayout&gt;
  );
}
<div class="label">JSX</div></code></pre>

      <h4>Pages/Employees/Create.jsx</h4>
      <pre><code><span class="kw">import</span> EmployeeForm from <span class="str">'./EmployeeForm'</span>;
<span class="kw">export default function</span> <span class="fn">Create</span>({ departments, managers }) {
  <span class="kw">return</span> &lt;EmployeeForm departments={departments} managers={managers} /&gt;;
}
<div class="label">JSX</div></code></pre>

      <h4>Pages/Employees/Edit.jsx</h4>
      <pre><code><span class="kw">import</span> EmployeeForm from <span class="str">'./EmployeeForm'</span>;
<span class="kw">export default function</span> <span class="fn">Edit</span>({ employee, departments, managers }) {
  <span class="kw">return</span> &lt;EmployeeForm employee={employee} departments={departments} managers={managers} isEdit={true} /&gt;;
}
<div class="label">JSX</div></code></pre>

      <p>Add <code>create</code> method to EmployeeController:</p>
      <pre><code><span class="kw">public function</span> <span class="fn">create</span>() {
    $departments = Department::latest()-><span class="fn">get</span>();
    $managers    = Manager::<span class="fn">with</span>(<span class="str">'department'</span>)->latest()-><span class="fn">get</span>();
    <span class="kw">return</span> Inertia::<span class="fn">render</span>(<span class="str">'Employees/Create'</span>, <span class="fn">compact</span>(<span class="str">'departments'</span>, <span class="str">'managers'</span>));
}
<div class="label">PHP</div></code></pre>
    </div>

    <!-- STEP 13 -->
    <div class="step" id="step13">
      <div class="step-header">
        <div class="step-num orange">13</div>
        <div>
          <div class="step-title">Employee View Page</div>
          <div class="step-sub">resources/js/Pages/Employees/Show.jsx</div>
        </div>
      </div>

      <pre><code><span class="kw">import</span> AppLayout from <span class="str">'@/Layouts/AppLayout'</span>;
<span class="kw">import</span> { Link } from <span class="str">'@inertiajs/react'</span>;
<span class="kw">import</span> { ArrowLeft, Pencil } from <span class="str">'lucide-react'</span>;

<span class="kw">export default function</span> <span class="fn">Show</span>({ employee }) {
  <span class="kw">const</span> fields = [
    { label: <span class="str">'Full Name'</span>,     value: employee.full_name },
    { label: <span class="str">'Employee Code'</span>, value: employee.employee_code },
    { label: <span class="str">'Department'</span>,    value: employee.department?.name },
    { label: <span class="str">'Manager'</span>,       value: employee.manager?.name ?? <span class="str">'N/A'</span> },
    { label: <span class="str">'Joining Date'</span>,  value: employee.joining_date },
    { label: <span class="str">'Email'</span>,         value: employee.email },
    { label: <span class="str">'Phone'</span>,         value: employee.phone ?? <span class="str">'N/A'</span> },
  ];

  <span class="kw">return</span> (
    &lt;AppLayout&gt;
      &lt;div className=<span class="str">"max-w-2xl"</span>&gt;
        &lt;div className=<span class="str">"flex items-center justify-between mb-6"</span>&gt;
          &lt;Link href={route(<span class="str">'employees.index'</span>)} className=<span class="str">"flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"</span>&gt;
            &lt;ArrowLeft size={16}/&gt; Back to Employees
          &lt;/Link&gt;
          &lt;Link href={route(<span class="str">'employees.edit'</span>, employee.id)}
            className=<span class="str">"flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"</span>&gt;
            &lt;Pencil size={15}/&gt; Edit
          &lt;/Link&gt;
        &lt;/div&gt;

        &lt;div className=<span class="str">"bg-white rounded-xl border border-gray-200 p-8"</span>&gt;
          &lt;div className=<span class="str">"flex items-center gap-4 mb-8 pb-6 border-b border-gray-100"</span>&gt;
            &lt;div className=<span class="str">"w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold"</span>&gt;
              {employee.full_name.<span class="fn">charAt</span>(<span class="num">0</span>)}
            &lt;/div&gt;
            &lt;div&gt;
              &lt;h1 className=<span class="str">"text-xl font-bold text-gray-900"</span>&gt;{employee.full_name}&lt;/h1&gt;
              &lt;p className=<span class="str">"text-gray-500 text-sm"</span>&gt;{employee.employee_code}&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;dl className=<span class="str">"grid grid-cols-2 gap-6"</span>&gt;
            {fields.<span class="fn">map</span>(({ label, value }) =&gt; (
              &lt;div key={label}&gt;
                &lt;dt className=<span class="str">"text-xs font-medium text-gray-500 uppercase tracking-wide"</span>&gt;{label}&lt;/dt&gt;
                &lt;dd className=<span class="str">"mt-1 text-sm font-medium text-gray-900"</span>&gt;{value}&lt;/dd&gt;
              &lt;/div&gt;
            ))}
          &lt;/dl&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/AppLayout&gt;
  );
}
<div class="label">JSX</div></code></pre>
    </div>

    <!-- STEP 14 -->
    <div class="step" id="step14">
      <div class="step-header">
        <div class="step-num red">14</div>
        <div>
          <div class="step-title">Soft Delete — Verify it Works</div>
          <div class="step-sub">Deleted records are excluded from all queries automatically</div>
        </div>
      </div>

      <div class="info-box">
        <strong>How SoftDeletes works:</strong> When <code>$model->delete()</code> is called, Laravel sets
        <code>deleted_at</code> timestamp instead of removing the row. All queries automatically add
        <code>WHERE deleted_at IS NULL</code>.
      </div>

      <h3>Ensure Model uses SoftDeletes</h3>
      <pre><code><span class="kw">use</span> Illuminate\Database\Eloquent\SoftDeletes;

<span class="kw">class</span> <span class="cls">Employee</span> <span class="kw">extends</span> <span class="cls">Model</span> {
    <span class="kw">use</span> SoftDeletes; <span class="cm">// ← this is all you need</span>
    ...
}
<div class="label">PHP</div></code></pre>

      <h3>Verify in Tinker</h3>
      <pre><code><span class="kw">php</span> artisan tinker
>>> Employee::<span class="fn">count</span>();     <span class="cm">// total active</span>
>>> Employee::<span class="fn">withTrashed</span>()-><span class="fn">count</span>(); <span class="cm">// including deleted</span>
<div class="label">bash</div></code></pre>
    </div>

    <!-- STEP 15 -->
    <div class="step" id="step15">
      <div class="step-header">
        <div class="step-num green">15</div>
        <div>
          <div class="step-title">Final Setup & Run</div>
          <div class="step-sub">Seed data + start servers</div>
        </div>
      </div>

      <h3>15.1 — Optional: Seed Data</h3>
      <pre><code><span class="kw">php</span> artisan make:seeder DatabaseSeeder
<div class="label">bash</div></code></pre>

      <pre><code><span class="cm">// database/seeders/DatabaseSeeder.php</span>
<span class="kw">public function</span> <span class="fn">run</span>(): void
{
    \App\Models\Department::<span class="fn">insert</span>([
        [<span class="str">'name'</span> => <span class="str">'Sales'</span>,      <span class="str">'created_at'</span> => now()],
        [<span class="str">'name'</span> => <span class="str">'HR'</span>,         <span class="str">'created_at'</span> => now()],
        [<span class="str">'name'</span> => <span class="str">'IT'</span>,         <span class="str">'created_at'</span> => now()],
        [<span class="str">'name'</span> => <span class="str">'Marketing'</span>,  <span class="str">'created_at'</span> => now()],
        [<span class="str">'name'</span> => <span class="str">'Finance'</span>,    <span class="str">'created_at'</span> => now()],
        [<span class="str">'name'</span> => <span class="str">'Operations'</span>, <span class="str">'created_at'</span> => now()],
    ]);
}
<div class="label">PHP</div></code></pre>

      <pre><code><span class="kw">php</span> artisan db:seed
<div class="label">bash</div></code></pre>

      <h3>15.2 — Run Everything</h3>
      <pre><code><span class="cm"># Terminal 1 — Laravel</span>
<span class="kw">php</span> artisan serve

<span class="cm"># Terminal 2 — Vite (React)</span>
<span class="kw">npm</span> run dev
<div class="label">bash</div></code></pre>

      <h3>15.3 — File Structure</h3>
      <div class="file-tree">
        <span class="dir">resources/js/</span>
        ├── <span class="dir">Layouts/</span>
        │ └── <span class="file">AppLayout.jsx</span> <span class="comment"># sidebar + header</span>
        ├── <span class="dir">Pages/</span>
        │ ├── <span class="dir">Departments/</span>
        │ │ └── <span class="file">Index.jsx</span>
        │ ├── <span class="dir">Managers/</span>
        │ │ └── <span class="file">Index.jsx</span>
        │ └── <span class="dir">Employees/</span>
        │ ├── <span class="file">Index.jsx</span> <span class="comment"># list + filters</span>
        │ ├── <span class="file">Create.jsx</span>
        │ ├── <span class="file">Edit.jsx</span>
        │ ├── <span class="file">Show.jsx</span>
        │ └── <span class="file">EmployeeForm.jsx</span> <span class="comment"># shared form</span>
        <span class="dir">app/Http/Controllers/</span>
        ├── <span class="file">DepartmentController.php</span>
        ├── <span class="file">ManagerController.php</span>
        └── <span class="file">EmployeeController.php</span>
        <span class="dir">routes/</span>
        └── <span class="file">web.php</span>
      </div>

      <h3>15.4 — Access the app</h3>
      <div class="grid2">
        <div class="card"><strong>🌐 App URL</strong>http://localhost:8000</div>
        <div class="card"><strong>🔐 Register first</strong>http://localhost:8000/register</div>
        <div class="card"><strong>👥 Employees</strong>http://localhost:8000/employees</div>
        <div class="card"><strong>🏢 Departments</strong>http://localhost:8000/departments</div>
      </div>

      <div class="info-box" style="margin-top:24px">
        <strong>✅ Done!</strong> You now have a full Laravel 11 + React + Inertia.js Employee Management System with:
        Breeze auth, sidebar navigation, Department/Manager/Employee CRUD, Yajra server-side DataTables, live filtering,
        date range pickers, soft deletes with confirmation dialogs, and employee view pages.
      </div>
    </div>

  </div>
</body>

</html>