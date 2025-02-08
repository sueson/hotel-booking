import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



const schema = defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        password: v.optional(v.string()),
        image: v.optional(v.string()),
        createdAt: v.number(),
        provider: v.string()
    })
    // To get the specific user...
    .index("by_email", ["email"])
    .index("by_provider", ["provider", "email"]),
})


export default schema;