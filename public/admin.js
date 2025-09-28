
// Admin password obfuscated (Base64 + shift)
const OBFUSCATED_PASSWORD = 'cml0dWxpc2dyZWF0QDI2MDMh';

// Simple deobfuscation function
function getAdminPassword() {
    try {
        const decoded = atob(OBFUSCATED_PASSWORD);
        return decoded;
    } catch (e) {
        return null;
    }
}

// Security variables
let failedAttempts = 0;
let lockoutTime = null;
const MAX_ATTEMPTS = 7;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Content storage
let portfolioContent = {
    about: '',
    devSkills: [],
    backendSkills: [],
    allSkills: [],
    achievements: [],
    projects: []
};

// Save content to localStorage
function saveContentToStorage() {
    try {
        const contentToSave = {
            about: portfolioContent.about,
            devSkills: portfolioContent.devSkills,
            backendSkills: portfolioContent.backendSkills,
            allSkills: portfolioContent.allSkills,
            achievements: portfolioContent.achievements,
            projects: portfolioContent.projects,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('portfolioContent', JSON.stringify(contentToSave));
        console.log('Content saved to localStorage successfully');
        return true;
    } catch (error) {
        console.error('Failed to save content to localStorage:', error);
        return false;
    }
}

// Load content from localStorage
function loadContentFromStorage() {
    try {
        const savedContent = localStorage.getItem('portfolioContent');
        if (savedContent) {
            const parsed = JSON.parse(savedContent);
            portfolioContent = {
                about: parsed.about || '',
                devSkills: parsed.devSkills || [],
                backendSkills: parsed.backendSkills || [],
                allSkills: parsed.allSkills || [],
                achievements: parsed.achievements || [],
                projects: parsed.projects || []
            };
            console.log('Content loaded from localStorage, last updated:', parsed.lastUpdated);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to load content from localStorage:', error);
        return false;
    }
}

// Load saved content or fall back to current page content
function loadSavedContent() {
    const hasStoredContent = loadContentFromStorage();
    
    if (hasStoredContent) {
        console.log('Using saved content from localStorage');
        // Apply saved content to the page
        applySavedContentToPage();
    } else {
        console.log('No saved content found, loading from current page');
        loadCurrentContent();
        // Save the initial content
        saveContentToStorage();
    }
}

// Apply saved content to the page
function applySavedContentToPage() {
    console.log('Applying saved content to page...');
    
    // Apply about section
    if (portfolioContent.about) {
        const aboutElement = document.querySelector('.about-text');
        if (aboutElement) {
            aboutElement.innerHTML = portfolioContent.about;
        }
    }
    
    // Apply skills section
    if (portfolioContent.allSkills.length > 0) {
        updateUnifiedSkillsSection();
    }
    
    // Apply achievements section
    if (portfolioContent.achievements.length > 0) {
        updateAchievementsSection();
    }
    
    // Apply projects section
    if (portfolioContent.projects.length > 0) {
        updateProjectsSection();
    }
    
    console.log('Saved content applied to page successfully');
}

// Initialize admin system
document.addEventListener('DOMContentLoaded', function() {
    loadSavedContent();
});

// Show admin login
function showAdminLogin() {
    // Check if user is locked out
    if (lockoutTime && Date.now() < lockoutTime) {
        const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        alert(`Access locked due to multiple failed attempts. Please wait ${minutes}m ${seconds}s before trying again.`);
        return;
    }
    
    // Reset lockout if time has passed
    if (lockoutTime && Date.now() >= lockoutTime) {
        lockoutTime = null;
        failedAttempts = 0;
    }
    
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminEditForm').style.display = 'none';
    document.getElementById('adminPassword').focus();
}

// Close admin panel
function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// Check password
function checkPassword() {
    const enteredPassword = document.getElementById('adminPassword').value.trim();
    const actualPassword = getAdminPassword();
    
    if (enteredPassword === actualPassword) {
        // Reset failed attempts on successful login
        failedAttempts = 0;
        lockoutTime = null;
        // Clear lockout data from localStorage
        localStorage.removeItem('adminLockout');
        localStorage.removeItem('adminAttempts');
        
        console.log('Admin login successful - password attempts reset');
        console.log('Failed attempts reset to:', failedAttempts);
        
        // Force reload current content from page to capture any changes
        console.log('Admin login successful, reloading current content...');
        loadCurrentContent();
        
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminEditForm').style.display = 'block';
        loadAdminContent();
    } else {
        failedAttempts++;
        document.getElementById('adminPassword').value = '';
        
        if (failedAttempts >= MAX_ATTEMPTS) {
            lockoutTime = Date.now() + LOCKOUT_DURATION;
            // Save lockout info to localStorage so it persists across page refreshes
            localStorage.setItem('adminLockout', lockoutTime.toString());
            localStorage.setItem('adminAttempts', failedAttempts.toString());
            alert(`Access locked for 5 minutes due to ${MAX_ATTEMPTS} failed attempts. Please wait before trying again.`);
            closeAdmin();
        } else {
            // Save current attempt count
            localStorage.setItem('adminAttempts', failedAttempts.toString());
            const remainingAttempts = MAX_ATTEMPTS - failedAttempts;
            alert(`Incorrect password! ${remainingAttempts} attempt(s) remaining before lockout.`);
        }
    }
}

// Load current content from the page
function loadCurrentContent() {
    console.log('Loading current content from page...');
    
    // Load about content
    const aboutElement = document.querySelector('.about-text');
    if (aboutElement) {
        portfolioContent.about = aboutElement.innerHTML;
        console.log('About content loaded:', portfolioContent.about.substring(0, 50) + '...');
    } else {
        console.warn('About element not found');
    }

    // Load all skills from the unified skills grid
    const allSkillElements = document.querySelectorAll('.skill-box');
    const allSkills = Array.from(allSkillElements).map(skill => {
        const name = skill.querySelector('.skill-name').textContent;
        const img = skill.querySelector('.skill-icon[src]');
        return {
            name: name,
            icon: img ? img.src : ''
        };
    });
    
    // Store all skills in a single array instead of separate dev/backend arrays
    portfolioContent.allSkills = allSkills;
    // Keep empty arrays for backward compatibility
    portfolioContent.devSkills = [];
    portfolioContent.backendSkills = [];
    
    console.log('Loaded', allSkills.length, 'skills from page:', allSkills);

    // Load achievements (they are actually certification cards)
    const achievementElements = document.querySelectorAll('.certification-card');
    portfolioContent.achievements = Array.from(achievementElements).map(achievement => {
        const img = achievement.querySelector('.cert-logo');
        const title = achievement.querySelector('h3');
        const desc = achievement.querySelector('p');
        const link = achievement.querySelector('.view-cert-btn');
        return {
            image: img ? img.src : '',
            title: title ? title.textContent : '',
            description: desc ? desc.textContent : '',
            link: link ? link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '' : ''
        };
    });
    
    console.log('Loaded', portfolioContent.achievements.length, 'achievements from page:', portfolioContent.achievements);

    // Load projects
    const projectElements = document.querySelectorAll('.project-card');
    portfolioContent.projects = Array.from(projectElements).map(project => {
        const img = project.querySelector('.project-img img');
        const title = project.querySelector('.project-title');
        const desc = project.querySelector('.project-subtitle');
        const link = project.querySelector('.small-btn');
        return {
            image: img ? img.src : '',
            title: title ? title.textContent : '',
            description: desc ? desc.textContent : '',
            link: link ? link.href : ''
        };
    });
    
    console.log('Loaded', portfolioContent.projects.length, 'projects:', portfolioContent.projects);
    
    // Also load projects from project-container if it exists
    if (portfolioContent.projects.length === 0) {
        console.log('No projects loaded from project-card, checking project-container...');
        const projectContainer = document.querySelector('.project-container');
        if (projectContainer) {
            const allProjects = projectContainer.querySelectorAll('.project-card');
            console.log('Found', allProjects.length, 'project cards in container');
        }
    }
}

// Load content into admin form
function loadAdminContent() {
    // Load about text
    document.getElementById('aboutText').value = portfolioContent.about.replace(/<br><br>/g, '\n\n').replace(/<br>/g, '\n').replace(/<[^>]*>/g, '');

    // Load skills
    loadUnifiedSkillsEditor();

    // Load achievements
    loadAchievementsEditor();

    // Load projects
    loadProjectsEditor();
}

// Load unified skills editor
function loadUnifiedSkillsEditor() {
    console.log('Loading unified skills editor...');
    const container = document.getElementById('allSkills');
    
    if (!container) {
        console.error('All skills container not found!');
        return;
    }
    
    console.log('Found skills container, loading', portfolioContent.allSkills.length, 'skills');
    container.innerHTML = '';
    
    portfolioContent.allSkills.forEach((skill, index) => {
        console.log(`Loading skill ${index}:`, skill);
        const skillDiv = document.createElement('div');
        skillDiv.style.marginBottom = '15px';
        skillDiv.style.padding = '15px';
        skillDiv.style.border = '1px solid #333';
        skillDiv.style.borderRadius = '5px';
        skillDiv.innerHTML = `
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">Skill ${index + 1}</h4>
            <input type="text" class="admin-input" value="${skill.name || ''}" placeholder="Skill Name" onchange="updateSkill('allSkills', ${index}, 'name', this.value)">
            <input type="text" class="admin-input" value="${skill.icon || ''}" placeholder="Icon Path (e.g., images/skill.png)" onchange="updateSkill('allSkills', ${index}, 'icon', this.value)">
            <button class="admin-btn" style="background: #ff4757;" onclick="removeSkill('allSkills', ${index})">Remove</button>
        `;
        container.appendChild(skillDiv);
    });
    
    console.log('Unified skills editor loaded successfully');
}

// Legacy function for backward compatibility  
function loadSkillsEditor(containerId, skills) {
    // This is kept for legacy support but not used with new unified design
    console.log('Legacy skills editor called, redirecting to unified editor');
    loadUnifiedSkillsEditor();
}

// Load achievements editor
function loadAchievementsEditor() {
    console.log('Loading achievements editor...');
    const container = document.getElementById('achievementsList');
    
    if (!container) {
        console.error('Achievements list container not found!');
        return;
    }
    
    console.log('Found achievements container, loading', portfolioContent.achievements.length, 'achievements');
    container.innerHTML = '';
    
    portfolioContent.achievements.forEach((achievement, index) => {
        console.log(`Loading achievement ${index}:`, achievement);
        const achievementDiv = document.createElement('div');
        achievementDiv.style.marginBottom = '15px';
        achievementDiv.style.padding = '15px';
        achievementDiv.style.border = '1px solid #333';
        achievementDiv.style.borderRadius = '5px';
        achievementDiv.innerHTML = `
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">Achievement ${index + 1}</h4>
            <input type="text" class="admin-input" value="${achievement.title || ''}" placeholder="Achievement Title" onchange="updateAchievement(${index}, 'title', this.value)">
            <input type="text" class="admin-input" value="${achievement.image || ''}" placeholder="Image Path (e.g., images/cert.png)" onchange="updateAchievement(${index}, 'image', this.value)">
            <input type="text" class="admin-input" value="${achievement.link || ''}" placeholder="Certificate Link (URL)" onchange="updateAchievement(${index}, 'link', this.value)">
            <textarea class="admin-textarea" style="min-height: 80px;" placeholder="Description" onchange="updateAchievement(${index}, 'description', this.value)">${achievement.description || ''}</textarea>
            <button class="admin-btn" style="background: #ff4757;" onclick="removeAchievement(${index})">Remove</button>
        `;
        container.appendChild(achievementDiv);
    });
    
    console.log('Achievements editor loaded successfully');
}

// Load projects editor
function loadProjectsEditor() {
    console.log('Loading projects editor...');
    const container = document.getElementById('projectsList');
    
    if (!container) {
        console.error('Projects list container not found!');
        return;
    }
    
    console.log('Found projects container, loading', portfolioContent.projects.length, 'projects');
    container.innerHTML = '';
    
    portfolioContent.projects.forEach((project, index) => {
        console.log(`Loading project ${index}:`, project);
        const projectDiv = document.createElement('div');
        projectDiv.style.marginBottom = '15px';
        projectDiv.style.padding = '15px';
        projectDiv.style.border = '1px solid #333';
        projectDiv.style.borderRadius = '5px';
        projectDiv.innerHTML = `
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">Project ${index + 1}</h4>
            <input type="text" class="admin-input" value="${project.title || ''}" placeholder="Project Title" onchange="updateProject(${index}, 'title', this.value)">
            <input type="text" class="admin-input" value="${project.image || ''}" placeholder="Image Path (e.g., images/project.png)" onchange="updateProject(${index}, 'image', this.value)">
            <input type="text" class="admin-input" value="${project.link || ''}" placeholder="GitHub/Demo Link" onchange="updateProject(${index}, 'link', this.value)">
            <textarea class="admin-textarea" style="min-height: 100px;" placeholder="Project Description" onchange="updateProject(${index}, 'description', this.value)">${project.description || ''}</textarea>
            <button class="admin-btn" style="background: #ff4757;" onclick="removeProject(${index})">Remove</button>
        `;
        container.appendChild(projectDiv);
    });
    
    console.log('Projects editor loaded successfully');
}

// Update functions
function updateSkill(containerId, index, field, value) {
    console.log(`Updating skill ${index}, field ${field} to:`, value);
    if (containerId === 'allSkills') {
        if (portfolioContent.allSkills[index]) {
            portfolioContent.allSkills[index][field] = value;
            console.log('Updated skill:', portfolioContent.allSkills[index]);
        } else {
            console.error('Skill not found at index:', index);
        }
    } else {
        // Legacy support for old dev/backend skills
        const skillsArray = containerId === 'devSkills' ? portfolioContent.devSkills : portfolioContent.backendSkills;
        if (skillsArray[index]) {
            skillsArray[index][field] = value;
        }
    }
}

function updateAchievement(index, field, value) {
    portfolioContent.achievements[index][field] = value;
}

function updateProject(index, field, value) {
    console.log(`Updating project ${index}, field ${field} to:`, value);
    if (portfolioContent.projects[index]) {
        portfolioContent.projects[index][field] = value;
        console.log('Updated project:', portfolioContent.projects[index]);
    } else {
        console.error('Project not found at index:', index);
    }
}

// Add functions
function addSkill(type) {
    console.log('Adding new skill');
    portfolioContent.allSkills.push({ name: '', icon: '' });
    console.log('Skills after addition:', portfolioContent.allSkills);
    loadUnifiedSkillsEditor();
}

function addAchievement() {
    console.log('Adding new achievement');
    portfolioContent.achievements.push({ title: '', image: '', description: '', link: '' });
    console.log('Achievements after addition:', portfolioContent.achievements);
    loadAchievementsEditor();
}

function addProject() {
    console.log('Adding new project');
    portfolioContent.projects.push({ title: '', image: '', description: '', link: '' });
    console.log('Projects after addition:', portfolioContent.projects);
    loadProjectsEditor();
}

// Remove functions
function removeSkill(containerId, index) {
    console.log('Removing skill at index:', index);
    if (containerId === 'allSkills') {
        portfolioContent.allSkills.splice(index, 1);
        console.log('Skills after removal:', portfolioContent.allSkills);
        loadUnifiedSkillsEditor();
    } else {
        // Legacy support
        const skillsArray = containerId === 'devSkills' ? portfolioContent.devSkills : portfolioContent.backendSkills;
        skillsArray.splice(index, 1);
        loadSkillsEditor(containerId, skillsArray);
    }
}

function removeAchievement(index) {
    console.log('Removing achievement at index:', index);
    portfolioContent.achievements.splice(index, 1);
    console.log('Achievements after removal:', portfolioContent.achievements);
    loadAchievementsEditor();
}

function removeProject(index) {
    console.log('Removing project at index:', index);
    portfolioContent.projects.splice(index, 1);
    console.log('Projects after removal:', portfolioContent.projects);
    loadProjectsEditor();
}

// Save all changes
function saveAllChanges() {
    console.log('Saving all changes...');
    
    // Update about content from form
    const aboutText = document.getElementById('aboutText').value;
    portfolioContent.about = aboutText.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    
    // Update about section on page
    const aboutElement = document.querySelector('.about-text');
    if (aboutElement) {
        aboutElement.innerHTML = portfolioContent.about;
        console.log('About section updated');
    }

    // Update skills section
    updateUnifiedSkillsSection();
    console.log('Skills section updated');

    // Update achievements section
    updateAchievementsSection();
    console.log('Achievements section updated');

    // Update projects section
    updateProjectsSection();
    console.log('Projects section updated');
    
    // Save to localStorage for persistence
    const saved = saveContentToStorage();
    
    if (saved) {
        alert('All changes saved successfully and will persist across page refreshes!');
    } else {
        alert('Changes applied to page but failed to save persistently. Changes may be lost on refresh.');
    }
    
    closeAdmin();
}

// Update unified skills section in DOM
function updateUnifiedSkillsSection() {
    const container = document.querySelector('.skills-grid');
    if (!container) {
        console.error('Skills grid container not found! Looking for .skills-grid');
        return;
    }

    console.log('Updating skills section with', portfolioContent.allSkills.length, 'skills');
    container.innerHTML = '';
    
    portfolioContent.allSkills.forEach((skill, index) => {
        if (skill.name && skill.name.trim()) {
            console.log('Adding skill:', skill.name);
            const skillBox = document.createElement('div');
            skillBox.className = 'skill-box';
            skillBox.innerHTML = `
                <img class="skill-icon" src="${skill.icon}" alt="${skill.name}" />
                <span class="skill-name">${skill.name}</span>
            `;
            container.appendChild(skillBox);
        }
    });
    
    console.log('Skills section updated successfully');
}

// Legacy update skills section in DOM (kept for compatibility)
function updateSkillsSection(selector, skills, subtitle) {
    const column = document.querySelector(selector);
    if (!column) return;

    column.innerHTML = `<h2 class="skills-subtitle">${subtitle}</h2>`;
    
    skills.forEach(skill => {
        if (skill.name.trim()) {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skills-data';
            skillDiv.innerHTML = `
                <div class="skills-names">
                    <img class="skills-icon" src="${skill.icon}" alt="${skill.name.toLowerCase()}" />
                    <span class="skills-name">${skill.name}</span>
                </div>
            `;
            column.appendChild(skillDiv);
        }
    });
}

// Update achievements section in DOM
function updateAchievementsSection() {
    const container = document.querySelector('.certifications-slider');
    if (!container) {
        console.error('Achievements container not found! Looking for .certifications-slider');
        return;
    }

    console.log('Updating achievements section with', portfolioContent.achievements.length, 'achievements');
    container.innerHTML = '';
    
    portfolioContent.achievements.forEach((achievement, index) => {
        if (achievement.title && achievement.title.trim()) {
            console.log('Adding achievement:', achievement.title);
            const cardDiv = document.createElement('div');
            cardDiv.className = 'certification-card';
            cardDiv.innerHTML = `
                <img src="${achievement.image}" alt="${achievement.title}" class="cert-logo">
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <div class="cert-footer">
                    <button class="view-cert-btn" onclick="window.open('${achievement.link}')">View Certificate</button>
                </div>
            `;
            container.appendChild(cardDiv);
        }
    });
    
    console.log('Achievements section updated successfully');
}

// Update projects section in DOM
function updateProjectsSection() {
    const container = document.querySelector('.project-container');
    if (!container) {
        console.error('Project container not found! Looking for .project-container');
        return;
    }

    console.log('Updating projects section with', portfolioContent.projects.length, 'projects');
    container.innerHTML = '';
    
    portfolioContent.projects.forEach((project, index) => {
        if (project.title && project.title.trim()) {
            console.log('Adding project:', project.title);
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-card';
            projectDiv.innerHTML = `
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-subtitle">${project.description}</p>
                <div class="project-btns">
                    <a href="${project.link}" target="_blank" class="small-btn">Code</a>
                </div>
            `;
            container.appendChild(projectDiv);
        }
    });
    
    console.log('Projects section updated successfully');
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Initialize lockout status from localStorage if available
    const savedLockout = localStorage.getItem('adminLockout');
    const savedAttempts = localStorage.getItem('adminAttempts');
    
    if (savedLockout) {
        lockoutTime = parseInt(savedLockout);
        if (Date.now() >= lockoutTime) {
            // Lockout expired, clear it
            localStorage.removeItem('adminLockout');
            localStorage.removeItem('adminAttempts');
            lockoutTime = null;
            failedAttempts = 0;
        }
    }
    
    if (savedAttempts) {
        failedAttempts = parseInt(savedAttempts);
    }
    
    // Setup Enter key listener for password input
    const adminPasswordInput = document.getElementById('adminPassword');
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Add debug function to window for testing
    window.debugAdmin = function() {
        console.log('=== ADMIN DEBUG INFO ===');
        console.log('Admin panel element:', document.getElementById('adminPanel'));
        console.log('Projects list element:', document.getElementById('projectsList'));
        console.log('Project container element:', document.querySelector('.project-container'));
        console.log('Current portfolio content:', portfolioContent);
        console.log('Project cards on page:', document.querySelectorAll('.project-card').length);
        loadCurrentContent();
        console.log('Content after loading:', portfolioContent);
    };
    
    window.testProjectAdd = function() {
        addProject();
        console.log('After adding project:', portfolioContent.projects);
    };
    
    window.testProjectSave = function() {
        // Simulate adding a test project
        portfolioContent.projects.push({
            title: 'Test Project',
            image: 'images/test.png', 
            description: 'This is a test project',
            link: 'https://github.com/test'
        });
        updateProjectsSection();
        console.log('Test project added to DOM');
    };
    
    // Add backup and restore functions
    window.exportPortfolioData = function() {
        const data = JSON.stringify(portfolioContent, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('Portfolio data exported');
    };
    
    window.clearStoredData = function() {
        if (confirm('Are you sure you want to clear all stored portfolio data? This will reset to original content.')) {
            localStorage.removeItem('portfolioContent');
            location.reload();
        }
    };
    
    window.showStorageInfo = function() {
        const savedContent = localStorage.getItem('portfolioContent');
        if (savedContent) {
            const parsed = JSON.parse(savedContent);
            console.log('Stored portfolio data (last updated: ' + parsed.lastUpdated + '):', parsed);
            console.log('Storage size:', new Blob([savedContent]).size, 'bytes');
        } else {
            console.log('No stored portfolio data found');
        }
    };
    
    // Function to generate hash for a new password (for development use only)
    window.generatePasswordHash = async function(password) {
        const hash = await hashPassword(password);
        console.log('Password hash for "' + password + '":');
        console.log(hash);
        console.log('Copy this hash to replace ADMIN_PASSWORD_HASH in admin.js');
        return hash;
    };
});