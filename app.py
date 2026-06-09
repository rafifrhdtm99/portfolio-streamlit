import streamlit as st
import streamlit.components.v1 as components
import base64
import os
import re

# Set page config
st.set_page_config(
    page_title="Rafif Rohadiatama — Digital Marketing Portfolio",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Helper to read file
def read_file(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

# Helper to get base64 of image
def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")
    return ""

# Dynamic image inliner
def inline_images(html):
    # Find all src="..." or src='...' attributes
    matches = re.findall(r'src=["\']([^"\']+)["\']', html)
    for original_path in matches:
        if original_path.startswith("data:") or original_path.startswith("http"):
            continue
            
        filename = os.path.basename(original_path)
        candidate_paths = [
            original_path,
            filename,
            f"images/{filename}"
        ]
        
        found_path = None
        for p in candidate_paths:
            if os.path.exists(p):
                found_path = p
                break
                
        if found_path:
            img_b64 = get_base64_image(found_path)
            if img_b64:
                ext = os.path.splitext(found_path)[1].lower()
                mime_type = "image/png" if ext == ".png" else "image/jpeg"
                if ext == ".gif":
                    mime_type = "image/gif"
                elif ext == ".svg":
                    mime_type = "image/svg+xml"
                
                # Replace in HTML
                html = html.replace(f'src="{original_path}"', f'src="data:{mime_type};base64,{img_b64}"')
                html = html.replace(f"src='{original_path}'", f"src='data:{mime_type};base64,{img_b64}'")
    return html

# Rebuild single-file HTML
def build_html():
    html = read_file("index.html")
    css = read_file("style.css")
    js = read_file("script.js")
    
    # Inline CSS & JS
    html = html.replace('<link rel="stylesheet" href="style.css" />', f'<style>{css}</style>')
    html = html.replace('<script src="script.js"></script>', f'<script>{js}</script>')
    
    # Inline all images dynamically
    html = inline_images(html)
        
    return html

# Hide Streamlit UI elements for a clean full-screen look
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            header {visibility: hidden;}
            footer {visibility: hidden;}
            .stApp {
                margin: 0px;
                padding: 0px;
                background-color: #050510;
            }
            .block-container {
                padding: 0px !important;
            }
            iframe {
                display: block;
                border: none;
                width: 100vw;
                height: 100vh;
            }
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Build and render the HTML inside the iframe
html_content = build_html()
components.html(html_content, height=1200, scrolling=True)
