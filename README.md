# Samadhan Setu (समाधान सेतु)
### *A Digital Platform to Crowdsource Societal Challenges and Facilitate Collaborative Problem Solving Through Universities and Industry Partnerships*

**Smart India Hackathon (SIH 2026)**  
**Theme:** Smart Education & Innovation / Societal Problem-Solving Pipeline  
**Deployment Model:** **Currently piloted in Jharkhand — Built to scale across India**

---

## 🌟 Platform Mission

**Samadhan Setu** is not a passive complaint portal—it is an active innovation pipeline that transforms community challenges into deployable, measurable technological solutions:

$$\text{Citizen Problem} \longrightarrow \text{AI Categorization \& Duplicate Check} \longrightarrow \text{Admin Validation} \longrightarrow \text{University Matching} \longrightarrow \text{Student Team} \longrightarrow \text{Industry Grant} \longrightarrow \text{Prototype} \longrightarrow \text{Field Deployment} \longrightarrow \text{Social Impact}$$

---

## 🚀 Instant Launch

The platform runs instantly via its built-in zero-dependency server:

```bash
# Start the platform
node server.js
```

Then open your browser and navigate to:
👉 **`http://localhost:3000`**

*(Alternatively, you can also double-click `index.html` directly in any web browser!)*

---

## 🗺️ Pan-India Scalability & Jharkhand Pilot Architecture

The platform is designed with an extensible multi-state architecture while maintaining Jharkhand as the verified ground pilot:

### 1. State Selector & Location Hierarchy
- Global **State Selector** dropdown in the header and sandbox bar (Default: **Jharkhand**).
- Supports all 28 States & 8 Union Territories (Andhra Pradesh, Maharashtra, Karnataka, Tamil Nadu, Bihar, Delhi, etc.).
- Complete location hierarchy on every challenge:
  $$\mathbf{Country\ (India)} \longrightarrow \mathbf{State} \longrightarrow \mathbf{District} \longrightarrow \mathbf{City/Village} \longrightarrow \mathbf{Exact\ Location}$$
- Dependent Dropdowns: Selecting a state dynamically populates its authentic district list.

### 2. State-Specific Challenges (Clean Isolation)
- **Jharkhand (Pilot)**: 10 societal challenges covering Foliar crop blight, Fluoride water remediation, Tribal sickle cell screening, Municipal waste pyrolysis, Solar microgrid BMS, and Dalma forest fire telemetry.
- **Andhra Pradesh**: Coastal brackish water aquaculture salinity & DO IoT buoys, Rayalaseema drought pulse drip irrigation, Guntur chillies aflatoxin spectral scanning, and ASR district tribal malaria diagnostics.
- **Maharashtra**: Vidarbha pink bollworm smart solar pheromone traps, Godavari river tannery effluent monitoring, and Beed Marathwada farm pond evaporation monolayers.

### 3. "Explore India" Nationwide Discovery Page
- Interactive state-by-state matrix.
- Shows state-wise challenge counts, university R&D projects, participating institutions, industry sponsors, and verified beneficiaries.
- Click any state card to inspect localized challenges.

### 4. Multi-Level State Government Dashboards
Administrators can toggle jurisdiction scope:
$$\mathbf{Scope:\ All\ India} \longleftrightarrow \mathbf{State\ (e.g.\ Jharkhand,\ Andhra\ Pradesh,\ Maharashtra)} \longleftrightarrow \mathbf{District}$$
- Visual KPI cards, domain distributions, and district density charts recalculate dynamically.

### 5. Intelligent Cross-State University Matching
The matching engine evaluates:
- Local vs. National Tier institutions
- Academic disciplines & specialized labs
- Faculty specialization & student skills
- Past deployment track record

*Example*: A Jharkhand agriculture problem matches both **Birsa Agricultural University (BAU) locally for field trials** and the **Andhra University / IARI Consortium for advanced remote sensing & spectral modeling**.

---

## 🎬 SIH Presentation Demo Tracks

The top **Judge Sandbox Bar** includes dedicated presentation triggers:

1. **"SIH Pilot Demo" (Main SIH Presentation)**:
   - Uses **strictly Jharkhand data**.
   - Runs the complete 6-stage crop disease scenario from farmer submission to deployed social impact in Khunti.
2. **"Pan-India Scalability Tour"**:
   - Demonstrates the platform's scalability at the conclusion of the pitch:
   $$\mathbf{Jharkhand\ (Pilot)} \longrightarrow \mathbf{Andhra\ Pradesh} \longrightarrow \mathbf{Maharashtra} \longrightarrow \mathbf{Pan-India\ Discovery}$$
   - Confirms that the platform is architected for nationwide expansion without losing local pilot precision.

---

## 📍 Exact Problem Location & Real Leaflet + OpenStreetMap Engine

The **"Report a Societal Challenge"** form features a genuine geographic map powered by **Leaflet** and **OpenStreetMap**:
1. **Real Geographic Cartography**:
   - Live OpenStreetMap tiles showing authentic roads, topography, towns, villages, and landmarks.
   - Interactive zoom controls (+ / - and mouse wheel) and smooth pan-and-drag navigation.
   - Zero simulated grids or placeholder coordinates—pure geographic mapping.
2. **Interactive Draggable Pin Marker**:
   - Click anywhere on the map to place or reposition the marker.
   - Drag the marker across streets and fields to adjust the exact problem site.
   - Automatic map centering when selecting State or District dropdowns.
3. **Places & Addresses Search (OpenStreetMap Nominatim + Indian Gazetteer)**:
   - Search for specific villages, cities, or landmarks (e.g., *“China Amiram, Bhimavaram”* or *“Torpa, Khunti”*).
   - Automatically flies to the matched location, drops the pin, updates coordinates, and synchronizes State & District selectors.
4. **GPS "Use Current Location" with Permission Handling**:
   - Requests browser permission via HTML5 `navigator.geolocation`.
   - On approval: centers at high-precision coordinates with GPS accuracy indicator (e.g. `±15m`).
   - If denied: gracefully supports manual map placement without claiming false coordinates.
5. **Real-Time Reverse-Geocoding & Persistence**:
   - Dynamically resolves latitude & longitude into authentic postal / administrative addresses via Nominatim.
   - Coordinates (`latitude`, `longitude`, `gpsAccuracy`, `locationName`) are saved with the challenge and rendered as an interactive Leaflet mini-map on the Challenge Details page.

---

## 📎 Multi-File Evidence Upload & Live Media Engine

Citizens can substantiate challenges with verifiable visual and documentary evidence:
1. **Universal Multi-Format Support**:
   - **Photos**: JPG, PNG, WEBP (instant thumbnail generation via `FileReader`)
   - **Videos**: MP4, MOV, WEBM (integrated HTML5 playable video player preview)
   - **Documents**: PDF, DOC, DOCX (formatted file cards with size badges)
2. **Client-Side Validation & Safety**:
   - Enforces 25MB max size per file with clear alerts.
   - Live badge displaying total attached evidence count.
   - Individual remove button on each file card with instant memory cleanup (`URL.revokeObjectURL`).
3. **Evidence Description**:
   - Dedicated contextual narrative field explaining what the evidence demonstrates (e.g., *“Photographs taken on 10 Sept 2026 showing crop leaf lesions across 4 acres; lab PDF report confirms soil contamination.”*).
4. **Challenge Details Page Experience**:
   - Integrated **Location & Evidence Section**: Displays the exact location hierarchy, interactive map with coordinates chip, photo gallery, playable video container, and downloadable document cards alongside the AI categorization and problem workflow.

