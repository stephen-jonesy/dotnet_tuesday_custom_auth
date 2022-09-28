namespace DotnetTuesday.Authorization;

[AttributeUsage(AttributeTargets.Method)]
public class AllowAnonymousAttribute : Attribute
{ }