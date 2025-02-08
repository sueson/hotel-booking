import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const saveUsers = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        password: v.optional(v.string()),
        createdAt: v.number(),
        provider: v.string()
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", q => q.eq("email", args.email))
            .first();
        if(!existingUser) {
            await ctx.db.insert("users", {...args});
        }
        return existingUser?._id;
    }
})

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", q => q.eq("email", args.email))
            .first();
    }
});

export const getUserByProviderEmail = query({
    args: { provider: v.string(), email: v.string() },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("users")
        .withIndex("by_provider", q => 
          q.eq("provider", args.provider)
           .eq("email", args.email)
        )
        .first();
    }
});

export const getUserById = query({
    args: {
        id: v.id("users")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
})