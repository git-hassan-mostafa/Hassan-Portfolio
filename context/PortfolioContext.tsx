import supabase from "@/utils/supabase/supbase";
import {
  Experience,
  PortfolioData,
  Profile,
  Project,
  Skill,
  SocialLink,
} from "@/utils/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (field: keyof Profile, value: any) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  removeSkill: (id: string) => void;
  addExperience: (exp: Omit<Experience, "id">) => void;
  removeExperience: (id: string) => void;
  addProject: (proj: Omit<Project, "id">, file: File, fileName: string) => void;
  removeProject: (id: string) => void;
  addSocialLink: (link: SocialLink) => void;
  removeSocialLink: (platform: string) => void;
  saveProfile: (file: File) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    profile: {
      name: "",
      title: "",
      summary: "",
      location: "",
      email: "",
      summary2: "",
      summary3: "",
      yearsexperience: 0,
    },
    projects: [],
    skills: [],
    experience: [],
    socials: [],
  });

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("portfolio_project")
      .select("*");
    if (error) return [];
    return data || [];
  };

  const fetchSkills = async () => {
    const { data, error } = await supabase.from("portfolio_skill").select("*");
    if (error) return [];
    return data || [];
  };

  const fetchExperience = async () => {
    const { data, error } = await supabase
      .from("portfolio_experience")
      .select("*");
    if (error) return [];
    return data || [];
  };

  const fetchSocialLinks = async () => {
    const { data, error } = await supabase
      .from("portfolio_social_link")
      .select("*");
    if (error) return [];
    return data || [];
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("portfolio_profile")
      .select("*")
      .single();
    if (error) return null;
    return data;
  };

  const fetchPortfolio = async () => {
    const profilePromise = fetchProfile();
    const projectsPromise = fetchProjects();
    const skillsPromise = fetchSkills();
    const experiencePromise = fetchExperience();
    const socialLinksPromise = fetchSocialLinks();
    const [profile, projects, skills, experience, socialLinks] =
      await Promise.all([
        profilePromise,
        projectsPromise,
        skillsPromise,
        experiencePromise,
        socialLinksPromise,
      ]);
    setPortfolio({
      profile: profile || {},
      projects: projects || [],
      skills: skills || [],
      experience: experience || [],
      socials: socialLinks || [],
    });
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const saveProfile = async (file: File) => {
    try {
      const { error } = await supabase
        .from("portfolio_profile")
        .update(portfolio.profile)
        .like("name", portfolio.profile.name);
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([`profile-image/profile-image.png`]);
      console.log("Deleted old image with error:", deleteError);
      if (!deleteError) {
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(`profile-image/profile-image.png`, file as File, {
            contentType: "image/png",
            cacheControl: "3600",
          });
        if (error || uploadError) {
          alert(
            "Error updating profile or uploading image. Check console for details."
          );
          console.error(
            "Error updating profile or uploading image:",
            error || uploadError
          );
          return;
        }
      }
      if (error) {
        alert("Error updating profile. Check console for details.");
        console.error("Error updating profile:", error);
        return;
      }
      alert("Profile updated successfully.");
    } catch (err) {
      alert("Error saving profile. Check console for details.");
      console.log(err);
    }
  };

  const updateProfile = async (field: keyof Profile, value: any) => {
    setPortfolio((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const addSkill = async (skill: Omit<Skill, "id">) => {
    const { error } = await supabase.from("portfolio_skill").insert([skill]);
    if (error) {
      alert("Error adding skill. Check console for details.");
      console.error("Error adding skill:", error);
      return;
    }
    await fetchPortfolio();
    alert("Skill added successfully.");
  };

  const removeSkill = async (id: string) => {
    const { error } = await supabase
      .from("portfolio_skill")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Error deleting skill. Check console for details.");
      console.error("Error deleting skill:", error);
      return;
    }
    setPortfolio((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    alert("Skill deleted successfully.");
  };

  const addExperience = async (exp: Omit<Experience, "id">) => {
    const { error } = await supabase.from("portfolio_experience").insert([exp]);
    if (error) {
      alert("Error adding experience. Check console for details.");
      console.error("Error adding experience:", error);
      return;
    }
    await fetchPortfolio();
    alert("Experience added successfully.");
  };

  const removeExperience = async (id: string) => {
    const { error } = await supabase
      .from("portfolio_experience")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Error deleting experience. Check console for details.");
      console.error("Error deleting experience:", error);
      return;
    }
    setPortfolio((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
    alert("Experience deleted successfully.");
  };

  const addProject = async (
    proj: Omit<Project, "id">,
    file: File,
    fileName: string
  ) => {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`portfolio-projects-images/${fileName}`, file as File, {
          contentType: "image/png",
          cacheControl: "3600",
        });
      if (data) {
        proj.image = data.path;
        const response = await supabase
          .from("portfolio_project")
          .insert([proj]);

        if (response.error) {
          await supabase.storage
            .from("images")
            .remove([`portfolio-projects-images/${file?.name as string}`]);
        } else {
          await fetchPortfolio();
          alert("Project added successfully.");
        }
      } else {
        alert("Error uploading project image. Check console for details.");
        console.error(error);
      }
    } catch (error) {
      alert("Error adding project. Check console for details.");
      console.log(error);
    }
  };

  const removeProject = async (id: string) => {
    const { error } = await supabase
      .from("portfolio_project")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Error deleting project. Check console for details.");
      console.error("Error deleting project:", error);
      return;
    }
    var file = portfolio.projects.find((p) => p.id === id)?.image;
    await supabase.storage.from("images").remove([file as string]);
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    alert("Project deleted successfully.");
  };

  async function addSocialLink(link: SocialLink) {
    const { error } = await supabase
      .from("portfolio_social_link")
      .insert([link]);
    if (error) {
      alert("Error adding social link. Check console for details.");
      console.error("Error adding social link:", error);
      return;
    }
    await fetchPortfolio();
    alert("Social link added successfully.");
  }

  async function removeSocialLink(platform: string) {
    const { error } = await supabase
      .from("portfolio_social_link")
      .delete()
      .eq("platform", platform);
    if (error) {
      alert("Error deleting social link. Check console for details.");
      console.error("Error deleting social link:", error);
      return;
    }
    await fetchPortfolio();
    alert("Social link deleted successfully.");
  }

  return (
    <PortfolioContext.Provider
      value={{
        data: portfolio,
        updateProfile,
        addSkill,
        removeSkill,
        addExperience,
        removeExperience,
        addProject,
        removeProject,
        addSocialLink,
        removeSocialLink,
        saveProfile,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
