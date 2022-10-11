using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotnetTuesday.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace DotnetTuesday.Controllers;
    [Route("[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;

        public ProjectController(DataContext context)
        {
            _context = context;

        }

        // GET: Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProject(string id)
        {
            var contacts = (from c in _context.Project
            select c);
            var List = contacts.Where(c => c.OwnerID == id);
            Console.WriteLine( "get");

          if (_context.Project == null)
          {
              return NotFound();
          }
          
          if (List == null)
          {
            return CreatedAtAction("GetProject", "No todos found");

          }
            
            return await List.ToListAsync();

        }

        // PUT: Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(long id, Project Project)
        {
            Console.WriteLine("put");
            if (id != Project.Id)
            {
                Console.WriteLine("Bad request");

                return BadRequest();
            }

            _context.Entry(Project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine("saving");


            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    Console.WriteLine("not found");
                    return NotFound();
                }
                else
                {
                    Console.WriteLine("error");

                    throw;
                }
            }
            Console.WriteLine(Project);
            
            return NoContent();
        }

        // POST: Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project Project)
        {
            Console.WriteLine( "post");

          if (_context.Project == null)
          {
              return Problem("Entity set 'MyDbContext.Project'  is null.");
          }
          Console.WriteLine(Project);
            _context.Project.Add(Project);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProject", new { id = Project.Id }, Project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(long id)
        {
                        Console.WriteLine( "delete");

            if (_context.Project == null)
            {
                return NotFound();
            }
            var Project = await _context.Project.FindAsync(id);
            if (Project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(Project);
            await _context.SaveChangesAsync();

            return Ok(id);

        }

        private bool ProjectExists(long id)
        {
            return (_context.Project?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
