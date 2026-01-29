import os
import re

def fix_imports(file_path):
    """Remove version numbers from import statements."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match package@version in imports
        # Matches: "package@1.2.3" or 'package@1.2.3' or @scope/package@1.2.3
        pattern = r'(from\s+["\'])([^"\']+)@[\d\.]+(["\'])'
        new_content = re.sub(pattern, r'\1\2\3', content)
        
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8', newline='') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    base_path = r"c:\Users\HP\Desktop\sih2025\Cover Page Layout Design\src"
    fixed_count = 0
    
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                if fix_imports(file_path):
                    fixed_count += 1
                    print(f"✓ Fixed: {file}")
    
    print(f"\n✅ Total files fixed: {fixed_count}")

if __name__ == "__main__":
    main()
