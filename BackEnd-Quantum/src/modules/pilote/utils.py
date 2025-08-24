import os
import pandas as pd
from datetime import datetime
import qrcode
from PIL import Image
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import numpy as np
#output_dir="src/modules/data/DQPReports"
#pilots ="src/modules/data/pilots.csv"
def generate_reports(pilot_csv_path, output_dir="src/modules/data/DQPReports"):
    pilot_registry = pd.read_csv("src/modules/data/pilots.csv")
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    for _, row in pilot_registry.iterrows():
        pilot_dir = os.path.join(output_dir, row["pilot_id"])
        os.makedirs(pilot_dir, exist_ok=True)

        doc_id = f"{row['pilot_id']}_{timestamp}"
        pdf_report = os.path.join(pilot_dir, f"biometric_sync_report_{doc_id}.pdf")
        pdf_card = os.path.join(pilot_dir, f"reference_card_{doc_id}.pdf")
        qr_path = os.path.join(pilot_dir, f"qr_{doc_id}.png")

        # --- Courbe ECG ---
        fig, ax = plt.subplots(figsize=(10, 5))
        x = np.linspace(0, 6, 500)
        y = 0.95 + 0.02 * np.sin(2 * np.pi * 1.5 * x)
        ax.plot(x, y, label='Normalized ECG Pattern')
        ax.set_title(f"EntangleBeat™ ECG Report\n{row['full_name']} | DOB: {row['dob']}")
        ax.set_xlabel("Time (s)")
        ax.set_ylabel("Normalized Pulse Amplitude")
        ax.axhspan(0.0, 0.94, color='red', alpha=0.2)
        ax.axhspan(0.94, 0.96, color='orange', alpha=0.2)
        ax.axhspan(0.96, 1.0, color='green', alpha=0.2)
        ax.legend()
        plt.close(fig)

        # --- Sphère de Bloch ---
        bloch_fig = plt.figure(figsize=(6, 6))
        bloch_ax = bloch_fig.add_subplot(111, projection='3d')
        bloch_ax.set_title("Qudit-16 Distribution (Bloch Sphere)")
        bloch_ax.set_xlim([-1, 1])
        bloch_ax.set_ylim([-1, 1])
        bloch_ax.set_zlim([-1, 1])
        u = np.linspace(0, 2 * np.pi, 100)
        v = np.linspace(0, np.pi, 100)
        x_sphere = np.outer(np.cos(u), np.sin(v))
        y_sphere = np.outer(np.sin(u), np.sin(v))
        z_sphere = np.outer(np.ones(np.size(u)), np.cos(v))
        bloch_ax.plot_surface(x_sphere, y_sphere, z_sphere, color='lightblue', alpha=0.1)
        plt.close(bloch_fig)

        # --- QR Code ---
        qr_text = f"https://didoquantumpulse.com/reports/{doc_id}.pdf"
        qr_img = qrcode.make(qr_text)
        qr_img.save(qr_path)

        # --- Carte de référence ---
        ref_fig, ref_ax = plt.subplots(figsize=(6, 6))
        ref_ax.axis('off')
        qr_image = Image.open(qr_path)
        ref_ax.imshow(qr_image, aspect='auto', extent=[1.8, 4.2, 3.8, 5.8])
        ref_ax.text(0.5, 0.92, "EntangleBeat™ Reference Card", fontsize=16, ha='center', va='top', weight='bold', transform=ref_ax.transAxes)
        ref_ax.text(0.5, 0.25, f"Report ID: {doc_id}", fontsize=12, ha='center', transform=ref_ax.transAxes)
        ref_ax.text(0.5, 0.18, "Scan this code to verify authenticity.", fontsize=9, ha='center', color='gray', transform=ref_ax.transAxes)
        ref_ax.text(0.5, 0.12, f"Issued: {datetime.now().strftime('%Y-%m-%d %H:%M')}", fontsize=8, ha='center', color='gray', transform=ref_ax.transAxes)
        ref_fig.savefig(pdf_card)
        plt.close(ref_fig)

        # --- Sauvegarde dans le rapport principal ---
        with PdfPages(pdf_report) as pdf:
            pdf.savefig(fig)
            pdf.savefig(bloch_fig)
            pdf.savefig(ref_fig)

    return output_dir
